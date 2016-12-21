import Ember from 'ember';
import config from '../config/environment';
/* global PushNotification */

var appInstance;

var onDeviceReady = function() {

  window.navigator.splashscreen.hide();
  
  setTimeout(function(){
    window.analytics.startTrackerWithId(config.googleAnalyticsID);
    window.analytics.debugMode();  
  }, 3000);
  
  var container = appInstance.lookup ? appInstance : appInstance.container;
  var store = container.lookup('service:store');
  store.findAll('device').then(function(devices) {
    var device = devices.get('firstObject');
    if (device.get('enable_notifications')) {
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
        var push_notification_token = data.registrationId;
        device.set('push_notification_token', push_notification_token);
        device.save();
      });

      push.on('notification', function(data) {
        console.log('PUSH notification received: ', data);
      });

      push.on('error', function(e) {
        console.log('PUSH error received: ', e);
      });
    }
  });
};

var onResume = function() {
  
};

var initialize = function(applicationInstance) {
  appInstance = applicationInstance;
  document.addEventListener("deviceready", onDeviceReady, false);
  document.addEventListener("resume", onResume, false);
};

export default {
  name: 'device-ready',
  initialize: initialize
};
