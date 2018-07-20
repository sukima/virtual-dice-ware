import { computed } from '@ember/object';
import { not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  random: service(),
  tagName: 'footer',
  classNames: ['footer', 'container-fluid'],

  randomPaused: not('random.isPolling'),
  randomInitializing: not('random.initialEntropyComplete'),

  statusClass: computed('randomPaused', 'randomInitializing', function() {
    if (this.get('randomInitializing')) {
      return 'initializing';
    } else if (this.get('randomPaused')) {
      return 'paused';
    } else {
      return 'unpaused';
    }
  }),

  statusIcon: computed('randomPaused', 'randomInitializing', function() {
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
