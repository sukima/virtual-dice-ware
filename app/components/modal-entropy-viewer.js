import Ember from 'ember';

export default Ember.Component.extend({
  random: Ember.inject.service(),
  showEntropyViewer: Ember.computed.bool('open'),

  actions: {
    togglePolling() {
      const random = this.get('random');
      random.toggleProperty('pollingEnabled');
      random.pollEntropy();
    }
  }
});
