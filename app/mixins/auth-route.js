import Ember from 'ember';

var AuthMixin = Ember.Mixin.create({
  // TODO: handle the case where the api token exists, but is no longer valid.
  beforeModel: function() {
    var that = this;
    if (!this.get('preferences.api_token')) {
      var device = this.store.createRecord('device');
      return device.save().then(function() {
        that.set('preferences.api_token', device.get('api_token'));
      });
    }
  }
});

export default AuthMixin;
