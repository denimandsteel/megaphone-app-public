import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  taps: 0,
  showReset: false,

  hasPreviousPurchases: function() {
    return this.get('model').get('length') > 0;
  }.property('model.[]'),
  
  actions: {
    secretTap: function() {
      this.set('taps', this.get('taps') + 1);
      if (this.get('taps') > 5) {
        this.set('showReset', true);
      }
    },
    resetPersonalInfo: function() {
      this.set('preferences.seen_onboarding', false);      
      this.set('preferences.api_token', undefined);
      this.store.unloadAll();
      this.transitionToRoute('index');
    },

    openShareSheet: function() {

      // http://streetsensemedia.org/app
      // Street Sense Media App let's you pay vendors if you don't have cash! For iOS and Android

      var shareURL = "http://streetsensemedia.org/app";
      
      var options = {
        message: "Street Sense Media App lets you pay vendors if you don't have cash! For iOS and Android.",
        url: shareURL,
        chooserTitle: 'Pick an app' 
      };

      var onSuccess = function(result) {
        console.log("Share completed? " + result.completed); 
        console.log("Shared to app: " + result.app);
      };

      var onError = function(msg) {
        console.log("Sharing failed with message: " + msg);
      };

      window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    }
  }
});