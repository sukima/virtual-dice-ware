import Ember from 'ember';

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

export default Ember.Controller.extend({
  random: Ember.inject.service(),
  application: Ember.inject.controller(),
  words: Ember.computed.alias('application.model'),
  waitingForInitialEntropy: Ember.computed.not('random.initialEntropyComplete'),
  pollingPaused: Ember.computed.not('random.pollingEnabled'),

  passcodes: [],
  lastDieRolls: [],
  numberOfDice: 6,

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
      this.get('passcodes').pushObject(this.generatePasscode());
    }
  }
});
