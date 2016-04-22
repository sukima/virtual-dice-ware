export default {
  name: 'add-to-homescreen',
  initialize(container) {
    const addToHome = window.addToHomescreen({autostart: true, debug: false});
    container.register('service:addToHomescreen', addToHome, {instantiate: false});
  }
};
