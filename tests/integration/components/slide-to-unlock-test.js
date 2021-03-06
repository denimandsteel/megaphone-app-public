import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('slide-to-unlock', 'Integration | Component | slide to unlock', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{slide-to-unlock}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#slide-to-unlock}}
      template block text
    {{/slide-to-unlock}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
