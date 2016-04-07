import Ember from 'ember';

const SAMPLE_SIZE = 256;
const REHASH_INTERVAL = 200;

export default Ember.Service.extend({
  pollingEnabled: true,

  init() {
    this.set('pollEntropyCount', 0);
    this.set('generator', uheprng());
    this.pollEntropy();
  },

  addEntropy(...garbage) {
    const generator = this.get('generator');
    generator.addEntropy(...garbage);
    this.set('sample', generator.string(SAMPLE_SIZE));
  },

  pollEntropy() {
    if (this.get('pollingEnabled')) {
      this.addEntropy();
      this.incrementProperty('pollEntropyCount');
      Ember.run.later(this, 'pollEntropy', REHASH_INTERVAL);
    }
  },

  dieRoll(sides=6) {
    return this.get('generator')(sides) + 1;
  }
});
