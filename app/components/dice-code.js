import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  keys: Ember.computed('code', function() {
    return this.get('code').split('');
  }),

  dice: Ember.computed('keys', function() {
    return this.get('keys').map(die => `die-${die}.svg`);
  })
});
