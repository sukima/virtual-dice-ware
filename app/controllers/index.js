import { alias, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';

// From http://stackoverflow.com/a/6274381/227176
function shuffle(a, random) {
  let j, x, i;
  for (i = a.length; i; i -= 1) {
    j = random.dieRoll(i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}

export default Controller.extend({
  random: service(),
  application: controller(),
  numberOfDice: 6,

  words: alias('application.model'),
  waitingForInitialEntropy: not('random.initialEntropyComplete'),
  pollingPaused: not('random.isPolling'),

  init() {
    this._super(...arguments);
    this.set('passcodes', []);
    this.set('lastDieRolls', []);
  },

  rollDice() {
    const random = this.get('random');
    const numberOfDice = this.get('numberOfDice');
    let result = [];
    for (let i = 0; i < numberOfDice; i++) {
      let code = [
        random.dieRoll(),
        random.dieRoll(),
        random.dieRoll(),
        random.dieRoll(),
        random.dieRoll()
      ];
      result.push(shuffle(code, random).join(''));
    }
    return result;
  },

  generatePasscode() {
    return this.get('lastDieRolls')
      .map(code => this.get(`words.${code}`))
      .join(' ');
  },

  actions: {
    generate() {
      this.set('lastDieRolls', this.rollDice());
      this.get('passcodes').unshiftObject(this.generatePasscode());
    }
  }
});
