import Ember from 'ember';
import AuthMixin from '../mixins/auth-route';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';
import config from '../config/environment';

export default Ember.Route.extend(AuthMixin, NavBarMixin, {

  activate: function() {
    console.log('activate called');
    this.controllerFor("dashboard").set('loadingVendors', false);
  },

  nav: {
    controller: 'application',

    title: {
      text: 'STREET SENSE MEDIA'
    },

    rightButton: {
      text: 'Settings',

      action: function() {
        this.transitionTo('settings');
      }
    },
  }
});
