import Component from '@ember/component';

export default Component.extend({
  tagName: 'nav',
  classNames: ['navbar'],
  headerCollapsed: true,

  actions: {
    toggleCollapsed() {
      this.toggleProperty('headerCollapsed');
    }
  }
});
