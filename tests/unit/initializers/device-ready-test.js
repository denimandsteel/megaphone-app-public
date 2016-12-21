import Ember from 'ember';
import DeviceReadyInitializer from 'megaphone-app/initializers/device-ready';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | device ready', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  DeviceReadyInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
