import Ember from 'ember';
import AuthMixin from '../../mixins/auth-route';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(AuthMixin, NavBarMixin, {
  model() {
    return this.store.findAll('device').then(function(devices) {
      return devices.get('firstObject');
    });
  },
  nav: {
    title: {
      text: 'STREET SENSE MEDIA'
    },
  }
});
