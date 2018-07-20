import { computed, observer } from '@ember/object';
import { oneWay, not } from '@ember/object/computed';
import Component from '@ember/component';

const VALID_MATCH = /^[1-6]*$/;
const MAX_DIGITS = 5;

export default Component.extend({
  placeholder: 'Filter by die numbers',
  disabled: false,

  _value: oneWay('value'),

  valueIsValid: computed('_value', function() {
    const val = this.get('_value');
    return val.length <= MAX_DIGITS && VALID_MATCH.test(val);
  }),

   valueInvalid: not('valueIsValid'),

  inputClass: computed('valueIsValid', function() {
    return this.get('valueIsValid') ? '' : 'has-error';
  }),

  actionUp: observer('_value', function() {
    if (this.get('valueIsValid')) {
      this.attrs.update(this.get('_value'));
    }
  })
});
