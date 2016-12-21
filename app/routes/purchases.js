import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset-scroll';
import NavigationHistoryMixin from '../mixins/navigation-history';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(ResetScrollMixin, NavBarMixin, NavigationHistoryMixin, {
  model() {
    return this.store.findAll('purchase');
  },
  nav: {
    controller: 'application',

    title: {
      text: 'Transactions'
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
