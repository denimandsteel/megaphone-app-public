import Ember from 'ember';
import config from '../../config/environment';
/* global PushNotification */

export default Ember.Controller.extend({
  actions: {
    useNotifications: function() {
      var that = this;

      this.set('model.enable_notifications', true);
      this.get('model').save();

      var push = PushNotification.init({
        android: {
          senderID: config.gcmSenderID
        },
        ios: {
          senderID: config.gcmSenderID,
          gcmSandbox: config.gcmSandbox,
        }
      });

      push.on('registration', function(data) {
        console.log('registration: ', data.registrationId);
        var push_notification_token = data.registrationId;
        
        that.get('model').set('push_notification_token', push_notification_token);
        that.get('model').save();
      });

      push.on('notification', function(data) {
        console.log('PUSH notification received: ', data);
      });

      push.on('error', function(e) {
        console.log('PUSH error received: ', e);
      });

      this.transitionToRoute('intro/3-payment');
    }
  }
});
