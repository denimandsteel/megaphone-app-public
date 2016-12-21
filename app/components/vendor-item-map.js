import Ember from 'ember';

export default Ember.Component.extend({
  isActive: false,
  canPay: false,
  // vendorLocationsByNeighbourhood: function() {
  //   return vendor.locationsByNeighbourhood(neighbourhood);
  // }.property('vendor', 'neighbourhood'),

  actions: {
    toggleCollapsed: function() {
      this.set('isActive', !this.get('isActive'));
    },
    payVendor: function() {
      this.get('payVendor')(this.vendor);
    }
  }

});
