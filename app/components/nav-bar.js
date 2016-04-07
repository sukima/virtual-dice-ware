import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: ['navbar'],
  headerCollapsed: true,
  actions: {
    toggleCollapsed() {
      this.toggleProperty('headerCollapsed');
    }
  }
});
