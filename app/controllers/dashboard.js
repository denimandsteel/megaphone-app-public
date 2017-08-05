import Ember from 'ember';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  vendors: Ember.computed.alias("applicationController.vendors"),
  products: Ember.computed.alias("applicationController.products"),
  purchases: Ember.computed.alias("applicationController.purchases"),
  highlighted_product: null,
  productsSortingAsc: ['order:asc'],
  purchasesSortingRecent: ['created_at:desc'],
  sortedProducts: Ember.computed.sort('products', 'productsSortingAsc'),
  sortedCarouselProducts: Ember.computed.filterBy('sortedProducts', 'in_app'),
  recentPurchases: Ember.computed.sort('purchases', 'purchasesSortingRecent'),
  topRecentPurchases: function() {
    return this.get('recentPurchases').toArray().slice(0, 5);
  }.property('recentPurchases'),
  recentVendors: function() {
    var allRecentVendors = this.get('recentPurchases').toArray().map(function(purchase) {return purchase.get('vendor');});
    var vendorIds = [];
    var uniqueVendors = [];
    allRecentVendors.forEach(function (vendor) {
      if (vendor.get('id') && !vendorIds[vendor.get('id')]) {
        uniqueVendors.push(vendor);
        vendorIds[vendor.get('id')] = true;
      }
    });
    return uniqueVendors; 
  }.property('recentPurchases'),
  actions: {
    go_to_vendors_by_map: function() {
      this.transitionToRoute('vendors', {queryParams: {viewmode: 'map'}});
    },
    go_to_vendors_by_name: function() {
      this.transitionToRoute('vendors', {queryParams: {viewmode: 'name'}});
    }
  }
});
