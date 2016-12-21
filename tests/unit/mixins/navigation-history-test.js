import Ember from 'ember';
import NavigationHistoryMixin from 'megaphone-app/mixins/navigation-history';
import { module, test } from 'qunit';

module('Unit | Mixin | navigation history');

// Replace this with your real tests.
test('it works', function(assert) {
  let NavigationHistoryObject = Ember.Object.extend(NavigationHistoryMixin);
  let subject = NavigationHistoryObject.create();
  assert.ok(subject);
});
