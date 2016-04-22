import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),
  addToHomescreen: Ember.inject.service(),

  model() {
    return this.get('ajax').request('wordlist.json');
  },

  actions: {
    addToHomescreen() {
      this.get('addToHomescreen').show(true);
    }
  }
});
