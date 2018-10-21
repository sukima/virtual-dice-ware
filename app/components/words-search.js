import { computed, observer } from '@ember/object';
import { not } from '@ember/object/computed';
import Component from '@ember/component';

const VALID_MATCH = /^[1-6]*$/;
const MAX_DIGITS = 5;

export default Component.extend({
  placeholder: 'Filter by die numbers',
  disabled: false,

  valueIsValid: computed('value', function() {
    let value = this.get('value');
    return value.length <= MAX_DIGITS && VALID_MATCH.test(value);
  }),

  valueInvalid: not('valueIsValid'),

  inputClass: computed('valueIsValid', function() {
    return this.get('valueIsValid') ? '' : 'has-error';
  })
});
