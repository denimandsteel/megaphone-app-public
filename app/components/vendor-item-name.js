import Ember from 'ember';

export default Ember.Component.extend({
  isActive: false,
  canPay: false,
  
  actions: {
    toggleCollapsed: function() {
      this.set('isActive', !this.get('isActive'));
      return false;
    },

    payVendor: function() {
      this.get('payVendor')(this.vendor);
    }
  }

});
