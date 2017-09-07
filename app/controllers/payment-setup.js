import Ember from 'ember';
import config from '../config/environment';
import appServer from '../lib/app-server';
/* global PushNotification */

export default Ember.Controller.extend({
  isLoading: false,
  flashMessage: '',
  notifications_enabled: false,
  canUseApplePay: false,

  prefersCreditCard: Ember.computed.equal('model.preferred_payment_method', 'creditcard'),
  prefersApplePay: Ember.computed.equal('model.preferred_payment_method', 'applepay'),

  init() {
    var that = this;
    if (window.ApplePay) {
      ApplePay.canMakePayments()
      .then((message) => {
        that.set('canUseApplePay', true);
      })
      .catch((message) => {
        that.set('canUseApplePay', false);
      });  
    } else {
      that.set('canUseApplePay', false);
    }
  },

  updateCreditCardInfo: function(card_number, card_expiry_month, card_expiry_year, card_cvc) {
    var that = this;
    this.set('isLoading', true);
    
    appServer.updateCreditCardInfo(this.model, this.get('preferences.api_token'), card_number, card_expiry_month, card_expiry_year, card_cvc, function(error, data) {
      if (error) {
        that.set('flashMessage', error.responseText);
      } else {
        that.set('flashMessage', '');
        that.model.reload();
      }
      that.set('isLoading', false);
    });
  },

  actions: {
    enableNotifications: function() {
      var that = this;

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

        that.store.findAll('device').then(function(devices) {
          var device = devices.get('firstObject');
          console.log('setting device push_notification_token');
          device.set('push_notification_token', push_notification_token);
          device.set('enable_notifications', true);
          device.save();
        });
      });

      push.on('notification', function(data) {
        console.log('PUSH notification received: ', data);
      });

      push.on('error', function(e) {
        console.log('PUSH error received: ', e);
      });
    },
    disableNotifications: function() {
      this.model.set('enable_notifications', false);
      this.model.set('push_notification_token', null);
      this.model.save();
    },
    enableLocation: function() {
      this.model.set('enable_location', true);
    },
    disableLocation: function() {
      this.model.set('enable_location', false);
    },
    useTestCard: function() {
      this.updateCreditCardInfo("4242424242424242", "11", "17", "314");
    },
    useScannedCard: function(card_number, card_expiry_month, card_expiry_year, card_cvc) {
      this.updateCreditCardInfo(card_number, card_expiry_month, card_expiry_year, card_cvc);
    },

    switchToApplePay: function() {
      this.model.set('preferred_payment_method', 'applepay');
    },

    switchToCreditCard: function() {
      this.model.set('preferred_payment_method', 'creditcard');
    }
  }
});
