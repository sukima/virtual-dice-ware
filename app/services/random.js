/* globals uheprng */
import Service from '@ember/service';
import { computed } from '@ember/object';
import { equal, alias } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
const { min } = Math;

const SAMPLE_SIZE = 256;
const REHASH_INTERVAL = 200;

export default Service.extend({
  isPolling: alias('harvestTask.isRunning'),

  initialEntropyPercent: computed('pollEntropyCount', {
    get() {
      return min(this.get('pollEntropyCount') * 4, 100);
    }
  }),
  initialEntropyComplete: equal('initialEntropyPercent', 100),

  init() {
    this._super(...arguments);
    this.set('pollEntropyCount', 0);
    this.set('sample', '');
    this.set('generator', uheprng());
    this.get('harvestTask').perform();
  },

  addEntropy(...garbage) {
    const generator = this.get('generator');
    generator.addEntropy(...garbage);
    this.set('sample', generator.string(SAMPLE_SIZE));
  },

  dieRoll(sides=6) {
    return this.get('generator')(sides) + 1;
  },

  harvestTask: task(function * () {
    while (true) {
      this.addEntropy();
      this.incrementProperty('pollEntropyCount');
      yield timeout(REHASH_INTERVAL);
    }
  }).drop(),

  togglePolling() {
    const harvestTask = this.get('harvestTask');
    const method = get(harvestTask, 'isRunning') ? 'cancelAll' : 'perform';
    harvestTask[method]();
  }
});
