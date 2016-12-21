import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    if (typeof window.analytics !== 'undefined') {
      window.analytics.trackView(this.getWithDefault('currentRouteName', 'unknown'));
      window.analytics.debugMode();
    }
  }
});

Router.map(function() {
  this.route('intro/0-welcome');
  this.route('intro/1-notifications');
  this.route('intro/2-location');
  this.route('intro/3-payment');
  this.route('dashboard');
  this.route('vendors');
  this.route('settings');
  this.route('purchases');
  this.route('purchases/new');
  this.route('purchases/success');
  this.route('payment-setup');
});

export default Router;
