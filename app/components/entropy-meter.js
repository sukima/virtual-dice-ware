import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import ProgressComponent from 'ember-bootstrap/components/base/bs-progress';

export default ProgressComponent.extend({
  random: service(),
  classNames: ['entropy-meter', 'clickable'],

  isPolling: alias('random.isPolling'),

  completeText: 'Complete',

  complete: alias('random.initialEntropyComplete'),
  percent: alias('random.initialEntropyPercent'),

  styleWidth: computed('percent', function() {
    return htmlSafe(`width: ${this.get('percent')}%;`);
  }),

  meterType: computed('complete', 'isPolling', function() {
    if (!this.get('isPolling')) {
      return 'warning';
    } else if (this.get('complete')) {
      return 'success';
    } else {
      return 'default';
    }
  }),

  click() {
    this.get('random').togglePolling();
  }
});
