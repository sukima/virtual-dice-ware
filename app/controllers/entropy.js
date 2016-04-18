import Ember from 'ember';

export default Ember.Controller.extend({
  random: Ember.inject.service(),

  sampleDice: Ember.computed('random.sample', function() {
    return this.get('random.sample').split('')
      .map(rndChar => rndChar.charCodeAt(0) % 6 + 1);
  }),

  actions: {
    togglePolling() {
      const random = this.get('random');
      random.toggleProperty('pollingEnabled');
      random.pollEntropy();
    }
  }
});
