import Ember from 'ember';
import AuthMixin from '../mixins/auth-route';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(AuthMixin, NavBarMixin, {
  model: function() {
    return Ember.RSVP.hash({
      products: this.store.findAll('product'),
      vendors: this.store.findAll('vendor'),
      purchases: this.store.findAll('purchase'),
    });
  },
  
  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'products', model.products);
    Ember.set(controller, 'vendors', model.vendors);
    Ember.set(controller, 'purchases', model.purchases);
  },

  nav: {
    controller: 'application',

    title: {
      text: ''
    },

    leftButton: {
      text: 'Back',
      icon: 'back-icon',
      action: function() {
        this.transitionTo('dashboard');
      }
    },

    rightButton: {
      text: 'Settings',
      icon: 'settings-icon',
      action: function() {
        this.transitionTo('settings');
      }
    },
  },
});
