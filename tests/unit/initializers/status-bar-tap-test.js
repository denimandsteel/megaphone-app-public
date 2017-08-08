import Ember from 'ember';
import StatusBarTapInitializer from 'megaphone-app/initializers/status-bar-tap';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | status bar tap', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  StatusBarTapInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
