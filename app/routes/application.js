import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import MissingWordListError from '../utils/errors/missing-word-list';

export default Route.extend({
  ajax: service(),

  model() {
    return this.get('ajax').request('wordlist.json')
      .catch(error => { throw new MissingWordListError(error); });
  }
});
