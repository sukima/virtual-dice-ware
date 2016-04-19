import Ember from 'ember';
import ProgressComponent from 'ember-bootstrap/components/bs-progress';

export default ProgressComponent.extend({
  random: Ember.inject.service(),
  classNames: ['entropy-meter', 'clickable'],

  isPolling: Ember.computed.alias('random.pollingEnabled'),

  completeText: 'Complete',

  complete: Ember.computed.alias('random.initialEntropyComplete'),
  percent: Ember.computed.alias('random.initialEntropyPercent'),

  styleWidth: Ember.computed('percent', function() {
    return Ember.String.htmlSafe(`width: ${this.get('percent')}%;`);
  }),

  meterType: Ember.computed('complete', 'isPolling', function() {
    if (!this.get('isPolling')) {
      return 'warning';
    } else if (this.get('complete')) {
      return 'success';
    } else {
      return 'default';
    }
  }),

  click() {
    this.get('random').toggleProperty();
  }
});
