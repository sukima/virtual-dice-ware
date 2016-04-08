import Ember from 'ember';
import ProgressComponent from 'ember-bootstrap/components/bs-progress';

export default ProgressComponent.extend({
  random: Ember.inject.service(),
  classNames: ['entropy-meter', 'clickable'],

  isPolling: Ember.computed.alias('random.pollingEnabled'),

  completeText: 'Complete',

  percent: Ember.computed('random.pollEntropyCount', function() {
    return Math.min(this.get('random.pollEntropyCount') * 4, 100);
  }),

  styleWidth: Ember.computed('percent', function() {
    return Ember.String.htmlSafe(`width: ${this.get('percent')}%;`);
  }),

  complete: Ember.computed.equal('percent', 100),

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
    this.toggleProperty('isPolling');
    this.get('random').pollEntropy();
  }
});
