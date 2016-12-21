import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  flatten_image_urls: function(vendor_hash) {
    vendor_hash.image_url = vendor_hash.image.url;
    vendor_hash.thumb_url = vendor_hash.image.thumb.url;
    vendor_hash.cover_url = vendor_hash.image.cover.url;
    vendor_hash.profile_url = vendor_hash.image.profile.url;

    delete vendor_hash.image;

    return vendor_hash;
  },
  normalizeResponse: function(store, primaryModelClass, payload) {
    if( Object.prototype.toString.call( payload ) === '[object Array]' ) {
      payload = payload.map(this.flatten_image_urls);
    } else {
      payload = this.flatten_image_urls(payload);
    }

    return this._super(...arguments);
  },
  attrs: {
    locations: { embedded: 'always' },
    products: { embedded: 'always' },
  }
});
