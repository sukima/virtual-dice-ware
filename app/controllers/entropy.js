import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default Controller.extend({
  random: service(),

  sampleDice: computed('random.sample', function() {
    return this.get('random.sample').split('')
      .map(rndChar => rndChar.charCodeAt(0) % 6 + 1);
  }),

  actions: {
    togglePolling() {
      this.get('random').togglePolling();
    }
  }
});
