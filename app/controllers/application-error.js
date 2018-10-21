import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Controller.extend({
  error: reads('model'),
  is: computed('error.name', {
    get() {
      let errorName = this.get('error.name');
      return { [errorName]: true };
    }
  })
});
