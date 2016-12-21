import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalizeResponse: function(store, primaryModelClass, payload) {
    payload = payload.map(function(product_hash) {
      product_hash.image_url = product_hash.image.url;
      product_hash.thumb_url = product_hash.image.thumb.url;
      product_hash.cover_url = product_hash.image.cover.url;
      product_hash.profile_url = product_hash.image.profile.url;

      delete product_hash.image;

      return product_hash;
    });

    return this._super(...arguments);
  },
  attrs: {
    quantity: { serialize: false },
    order: { serialize: false }
  }
});
