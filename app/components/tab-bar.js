import Ember from 'ember';

export default Ember.Component.extend({
  random: Ember.inject.service(),
  tagName: 'footer',
  classNames: ['footer', 'container-fluid'],

  randomPaused: Ember.computed.not('random.pollingEnabled'),
  randomInitializing: Ember.computed.not('random.initialEntropyComplete'),

  statusClass: Ember.computed('randomPaused', 'randomInitializing', function() {
    if (this.get('randomInitializing')) {
      return 'initializing';
    } else if (this.get('randomPaused')) {
      return 'paused';
    } else {
      return 'unpaused';
    }
  }),

  statusIcon: Ember.computed('randomPaused', 'randomInitializing', function() {
    if (this.get('randomPaused')) {
      return 'glyphicon-play';
    } else if (this.get('randomInitializing')) {
      return 'glyphicon-time';
    } else {
      return 'glyphicon-pause';
    }
  }),

  actions: {
    togglePolling() {
      this.get('random').togglePolling();
    }
  }
});
