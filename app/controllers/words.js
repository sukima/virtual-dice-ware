import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';

const PAGE_SIZE = 50;

function withinBounds(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

export default Controller.extend({
  application: controller(),
  words: alias('application.model'),

  queryParams: {
    page: true,
    searchBy: 'q'
  },

  page: 1,
  searchBy: '',

  firstPage: 1,
  lastPage: computed('filteredKeys.length', function() {
    return Math.ceil(this.get('filteredKeys.length') / PAGE_SIZE);
  }),

  wordKeys: computed('words', function() {
    return Object.keys(this.get('words'));
  }),

  filteredKeys: computed('wordKeys.[]', 'searchBy', function() {
    const searchBy = this.get('searchBy');
    const wordKeys = this.get('wordKeys');
    if (searchBy !== '') {
      return wordKeys.filter(key => key.indexOf(searchBy) === 0);
    } else {
      return wordKeys;
    }
  }),

  paginatedKeys: computed('filteredKeys.[]', 'page', function() {
    const filteredKeys = this.get('filteredKeys');
    const page = this.get('page') - 1;
    const pos = (page * PAGE_SIZE);
    const start = Math.max(pos, 0);
    const end = Math.min(pos + PAGE_SIZE, filteredKeys.length);
    return filteredKeys.slice(start, end);
  }),

  setPageWithinBounds(page) {
    const newPage = 
      withinBounds(page, this.get('firstPage'), this.get('lastPage'));
    this.set('page', newPage);
    return newPage;
  },

  actions: {
    gotoPage(page) {
      this.setPageWithinBounds(page);
    },

    searchUpdate(term) {
      this.set('searchBy', term);
      this.setPageWithinBounds(this.get('page'));
    }
  }
});
