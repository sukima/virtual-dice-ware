import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'nav',

  isFirstPage: computed('page', 'firstPage', function() {
    return this.get('page') === this.get('firstPage');
  }),

  isLastPage: computed('page', 'lastPage', function() {
    return this.get('page') === this.get('lastPage');
  }),

  actions: {
    first() {
      this.attrs.gotoPage(this.get('firstPage'));
    },

    prev() {
      this.attrs.gotoPage(this.get('page') - 1);
    },

    next() {
      this.attrs.gotoPage(this.get('page') + 1);
    },

    last() {
      this.attrs.gotoPage(this.get('lastPage'));
    }
  }
});
