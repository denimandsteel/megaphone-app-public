import Ember from 'ember';
import AuthMixin from '../mixins/auth-route';

export default Ember.Route.extend(AuthMixin, {
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
});
