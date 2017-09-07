import Ember from 'ember';
import AuthMixin from '../mixins/auth-route';

export default Ember.Route.extend(AuthMixin, {
  beforeModel: function() {
    if (false && this.get('preferences.seen_onboarding')) {
      this.transitionTo('dashboard');
    } else {
      this.set('preferences.seen_onboarding', true);
      this.transitionTo('intro/0-welcome');
    }
  },
  actions: {
    goBack: function() {
      if (this.get('hasHistory')) {
        this.get('megaphoneHistory').popObject(); // dismiss current path
        var previousPath = this.get('megaphoneHistory').popObject();
        this.transitionToRoute(previousPath);
      } else {
        navigator.app.exitApp();
      }
    }
  }
});