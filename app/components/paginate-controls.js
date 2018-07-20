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
      this.get('gotoPage')(this.get('firstPage'));
    },

    prev() {
      this.get('gotoPage')(this.get('page') - 1);
    },

    next() {
      this.get('gotoPage')(this.get('page') + 1);
    },

    last() {
      this.get('gotoPage')(this.get('lastPage'));
    }
  }
});
