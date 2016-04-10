import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('entropy');
  this.route('words');
  this.route('about');
});

export default Router;
