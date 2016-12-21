import Ember from 'ember';
import ResetScrollMixin from '../../mixins/reset-scroll';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';
import NavigationHistoryMixin from '../../mixins/navigation-history';

export default Ember.Route.extend(ResetScrollMixin, NavBarMixin, NavigationHistoryMixin, {
  queryParams: {
    vendor: {
      refreshModel: true
    }
  },
  model: function(params) {
    return Ember.RSVP.hash({
      vendor: this.store.find('vendor', params.vendor),
      products: this.store.query('product', {in_app: true}),
      device: this.store.findAll('device').then(function(devices) {
                return devices.get('firstObject');
              })
    });
  },
  nav: {
    controller: 'application',

    title: {
      text: 'Purchase',
    },

    leftButton: {
      text: 'Back',
      icon: 'back-icon',
      action: function() {
        this.send('goBack');
      }
    },

    rightButton: {
      text: 'Settings',
      icon: 'settings-icon',
      action: function() {
        this.transitionTo('settings');
      }
    },
  }
});
