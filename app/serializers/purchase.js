import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizePayload: function(payload) {
    return { purchase: payload };
  },

  serialize(snapshot, options) {
    var json = this._super(...arguments);

    json.product_ids = [];
    snapshot.record.get('products').toArray().forEach(function(product) {
      var quantity = Number(product.get('quantity'));
      while(quantity--) {
        json.product_ids.push(product.get('id'));
      }
    });

    delete json.products;

    return {purchase: json};
  },
  attrs: {
    vendor: { embedded: 'always' },
    paid: { serialize: false },
    created_at: { serialize: false },
    paid_at: { serialize: false },
    device: { serialize: false }
  }
});
