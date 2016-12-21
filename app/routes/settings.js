import Ember from 'ember';
import ResetScrollMixin from '../mixins/reset-scroll';
import NavigationHistoryMixin from '../mixins/navigation-history';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(ResetScrollMixin, NavBarMixin, NavigationHistoryMixin, {
  model() {
    return this.store.findAll('purchase');
  },
  activate: function() {
    window.scrollTo(0, 0);
    this.controllerFor("settings").set("taps", 0);
    this.controllerFor("settings").set("showReset", false);
  },
  nav: {
    controller: 'application',

    title: {
      text: 'Settings',
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
