import Ember from 'ember';
/* global _ */

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  vendors: Ember.computed.alias("applicationController.vendors"),
  
  actions: {
    payVendor: function(vendor) {
      this.transitionToRoute('purchase', { queryParams: { vendor: vendor.get('id') }});
    },
  }
});
