import Ember from 'ember';
import AuthMixin from '../mixins/auth-route';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(AuthMixin, NavBarMixin, {
  nav: {
    controller: 'application',

    title: {
      text: 'MEGAPHONE'
    },

    rightButton: {
      text: 'Settings',

      action: function() {
        this.transitionTo('settings');
      }
    },
  }
});
