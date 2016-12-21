import DS from 'ember-data';
import Ember from 'ember';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.serverHost,
  headers: Ember.computed(function() {
    return {
      "Accept": "application/json",
      "Authorization": "Token " + this.get('preferences.api_token'),
    };
  }).volatile(),
});
