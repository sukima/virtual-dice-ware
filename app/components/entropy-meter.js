import Ember from 'ember';
import ProgressComponent from 'ember-bootstrap/components/bs-progress';

export default ProgressComponent.extend({
  random: Ember.inject.service(),
  classNames: ['entropy-meter'],
  classNameBindings: ['attrs.onclick:clickable'],

  completeText: 'Complete',

  percent: Ember.computed('random.pollEntropyCount', function() {
    return Math.min(this.get('random.pollEntropyCount') * 4, 100);
  }),

  styleWidth: Ember.computed('percent', function() {
    return Ember.String.htmlSafe(`width: ${this.get('percent')}%;`);
  }),

  complete: Ember.computed.equal('percent', 100),

  click() {
    if (this.attrs.onclick) {
      this.attrs.onclick();
    }
  }
});
