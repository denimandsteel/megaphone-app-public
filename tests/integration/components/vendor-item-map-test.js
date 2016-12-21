import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('vendor-item-map', 'Integration | Component | vendor item m map', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{vendor-item-map}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#vendor-item-m-map}}
      template block text
    {{/vendor-item-m-map}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
