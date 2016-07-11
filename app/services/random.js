import Ember from 'ember';

const {
  Service, get, set,
  computed, computed: { alias, equal }
} = Ember;

const SAMPLE_SIZE = 256;
const REHASH_INTERVAL = 200;

export default Service.extend({
  pollingEnabled: true,

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
    this.pollEntropy();
  },

  addEntropy(...garbage) {
    const generator = get(this, 'generator');
    generator.addEntropy(...garbage);
    set(this, 'sample', generator.string(SAMPLE_SIZE));
  },

  dieRoll(sides=6) {
    return get(this, 'generator')(sides) + 1;
  },

  pollEntropy() {
    if (get(this, 'pollingEnabled')) {
      this.addEntropy();
      this.incrementProperty('pollEntropyCount');
      Ember.run.later(this, 'pollEntropy', REHASH_INTERVAL);
    }
  },

  togglePolling() {
    this.toggleProperty('pollingEnabled');
    this.pollEntropy();
  }
});
