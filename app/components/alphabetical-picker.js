import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['alphabetical-picker'],
  tagName: 'ul',

  alphaList: function() {
    var vendors = this.get('vendors').toArray();
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(function(character) {
      var firstVendor = vendors.find(function(vendor) {
        return vendor.get('name').charAt(0).toUpperCase() === character;
      });
      return {
        character: character,
        active: firstVendor ? true : false,
        vendor: firstVendor ? firstVendor.get('id') : null,
      };
    });
  }.property('vendors.[]'),

  actions: {
    chooseCharacter(id) {
      if (id) {
        $('html,body').animate({ scrollTop: $('#vendor-' + id).offset().top - $('header').height() }, 250);
      }
    }
  }
});
