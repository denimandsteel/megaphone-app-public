import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset-scroll';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(ResetScrollMixin, NavBarMixin, {
  nav: {
    controller: 'application',

    title: {
      text: 'Find Vendors'
    },

    leftButton: {
      text: 'Back',
      icon: 'back-icon',
      action: function() {
        this.transitionTo('dashboard');
      }
    },

    rightButton: {
      text: 'Settings',
      icon: 'settings-icon',
      action: function() {
        this.transitionTo('settings');
      }
    },
  },
 
});
