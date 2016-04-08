import Ember from 'ember';

export default Ember.Controller.extend({
  random: Ember.inject.service(),

  actions: {
    togglePolling() {
      const random = this.get('random');
      random.toggleProperty('pollingEnabled');
      random.pollEntropy();
    }
  }
});
