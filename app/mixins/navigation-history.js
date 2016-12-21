import Ember from 'ember';

var NavigationHistoryMixin = Ember.Mixin.create({
  actions: {
    goBack: function() {
      var applicationController = Ember.getOwner(this).lookup("controller:application");
      var proxySendRefresh = $.proxy(applicationController.send, applicationController);
      proxySendRefresh('goBack');
    }
  }
});

export default NavigationHistoryMixin;
