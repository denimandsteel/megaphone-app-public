import Ember from 'ember';
import AuthMixin from '../mixins/auth-route';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';
import config from '../config/environment';

export default Ember.Route.extend(AuthMixin, NavBarMixin, {
  model: function() {
    return Ember.RSVP.hash({
      products: this.store.findAll('product'),
      vendors: this.store.findAll('vendor'),
      purchases: this.store.findAll('purchase'),
      victoriaVendors: this.store.query('vendor', {city: 'Victoria'}),
      vancouverVendors: this.store.query('vendor', {city: 'Vancouver'})
    });
  },
  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'products', model.products);
    Ember.set(controller, 'vendors', model.vendors);
    Ember.set(controller, 'purchases', model.purchases);
    Ember.set(controller, 'victoriaVendors', model.victoriaVendors);
    Ember.set(controller, 'vancouverVendors', model.vancouverVendors);
  },
  nav: {
    controller: 'application',

    title: {
      text: 'Street Sense'
    },

    rightButton: {
      text: 'Settings',

      action: function() {
        this.transitionTo('settings');
      }
    },
  }
});
