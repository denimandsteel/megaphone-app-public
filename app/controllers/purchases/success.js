import Ember from 'ember';

export default Ember.Controller.extend({
  vendorGood: false,
  customerGood: false,
  actions: {
    done: function() {
      this.set('customerGood', true);
      Ember.run.later(this, function() {
        this.set('vendorGood', false);
        this.set('customerGood', false);
        this.transitionToRoute('dashboard');
      }, 1500);
    },
    setVendorGood: function() {
      this.set('vendorGood', true);
    }
  }
});
