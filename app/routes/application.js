import Ember from 'ember';
import AuthMixin from '../mixins/auth-route';

export default Ember.Route.extend(AuthMixin, {
  model: function() {
    return Ember.RSVP.hash({
      products: this.store.findAll('product'),
      victoriaVendors: this.store.query('vendor', {city: 'Victoria'}),
      vancouverVendors: this.store.query('vendor', {city: 'Vancouver'}),
      purchases: this.store.findAll('purchase'),
    });
  },
  
  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'products', model.products);
    Ember.set(controller, 'victoriaVendors', model.victoriaVendors);
    Ember.set(controller, 'vancouverVendors', model.vancouverVendors);
    Ember.set(controller, 'purchases', model.purchases);
  },
});
