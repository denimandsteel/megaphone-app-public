import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  customEvents: {
    tap: 'click'
  },
  ready: function() {
    // $("#loading").addClass('hidden');
    // setTimeout(function(){ $("#loading").remove(); }, 1000);
    if (window.navigator && window.navigator.splashscreen) {
      window.navigator.splashscreen.hide();  
    }
  },
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
