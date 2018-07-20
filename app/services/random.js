import Service from '@ember/service';
import { computed, set, get } from '@ember/object';
import { equal, alias } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

const SAMPLE_SIZE = 256;
const REHASH_INTERVAL = 200;

export default Service.extend({
  isPolling: alias('harvestTask.isRunning'),

  initialEntropyPercent: computed('pollEntropyCount', {
    get() {
      return Math.min(get(this, 'pollEntropyCount') * 4, 100);
    }
  }),
  initialEntropyComplete: equal('initialEntropyPercent', 100),

  init() {
    this._super(...arguments);
    set(this, 'pollEntropyCount', 0);
    set(this, 'sample', '');
    set(this, 'generator', uheprng());
    get(this, 'harvestTask').perform();
  },

  addEntropy(...garbage) {
    const generator = get(this, 'generator');
    generator.addEntropy(...garbage);
    set(this, 'sample', generator.string(SAMPLE_SIZE));
  },

  dieRoll(sides=6) {
    return get(this, 'generator')(sides) + 1;
  },

  harvestTask: task(function * () {
    while (true) {
      this.addEntropy();
      this.incrementProperty('pollEntropyCount');
      yield timeout(REHASH_INTERVAL);
    }
  }).drop(),

  togglePolling() {
    const harvestTask = get(this, 'harvestTask');
    const method = get(harvestTask, 'isRunning') ? 'cancelAll' : 'perform';
    harvestTask[method]();
  }
});
