import Ember from 'ember';

const VALID_MATCH = /^[1-6]*$/;
const MAX_DIGITS = 5;

export default Ember.Component.extend({
  placeholder: 'Filter by die numbers',
  disabled: false,

  _value: Ember.computed.oneWay('value'),

  valueIsValid: Ember.computed('_value', function() {
    const val = this.get('_value');
    return val.length <= MAX_DIGITS && VALID_MATCH.test(val);
  }),

   valueInvalid: Ember.computed.not('valueIsValid'),

  inputClass: Ember.computed('valueIsValid', function() {
    return this.get('valueIsValid') ? '' : 'has-error';
  }),

  actionUp: Ember.observer('_value', function() {
    if (this.get('valueIsValid')) {
      this.attrs.update(this.get('_value'));
    }
  })
});
