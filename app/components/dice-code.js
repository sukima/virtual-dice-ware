import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',

  keys: computed('code', function() {
    return this.get('code').split('');
  }),

  dice: computed('keys', function() {
    return this.get('keys').map(die => `die-${die}.svg`);
  })
});
