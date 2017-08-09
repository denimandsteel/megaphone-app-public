import Ember from 'ember';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';
import NavigationHistoryMixin from '../mixins/navigation-history';
/* global PushNotification */

export default Ember.Route.extend(NavBarMixin, NavigationHistoryMixin, {
  model() {
    var that = this;
    return this.store.findAll('device').then(function(devices) {
      return devices.get('firstObject');
    });
  },

  activate: function() {
    var that = this;
    if (typeof PushNotification !== 'undefined') {
      PushNotification.hasPermission(function(data) {
        if (data.isEnabled) {
          that.set("model.enable_notifications", true);
          console.log('isEnabled');
        } else {
          console.log('no permission :(');
          that.set("model.enable_notifications", false);
        }
      });
    }
  },

  nav: {
    controller: 'application',

    title: {
      text: 'Payment'
    },

    leftButton: {
      text: 'Back',
      icon: 'back-icon',
      action: function() {
        this.send('goBack');
      }
    },
  }
});
