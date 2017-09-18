import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  flatten_image_urls: function(vendor_hash) {
    var defaultVendorImage = 'assets/images/vendor-default.svg';
    if (vendor_hash.image.url.length > 0) {
      vendor_hash.image_url = vendor_hash.image.url;
    } else {
      vendor_hash.image_url = defaultVendorImage;
    }
    
    if (vendor_hash.image.thumb.url.length > 0) {
      vendor_hash.thumb_url = vendor_hash.image.thumb.url;
    } else {
      vendor_hash.thumb_url = defaultVendorImage;
    }
    
    if (vendor_hash.image.cover.url.length > 0) {
      vendor_hash.cover_url = vendor_hash.image.cover.url;  
    } else {
      vendor_hash.cover_url = defaultVendorImage;
    }

    if (vendor_hash.image.profile.url.length > 0) {
      vendor_hash.profile_url = vendor_hash.image.profile.url;
    } else {
      vendor_hash.profile_url = defaultVendorImage;
    }

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
