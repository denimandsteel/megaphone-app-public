import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
  normalizeResponse: function(store, primaryModelClass, payload, id, requestType, isSingle) {
    return this._super(...arguments);
  },
  deserializeRecordId: function(store, key, relationship, id) {
    return this._super(...arguments);
  },

  normalizeRelationship: function(store, key, relationship, jsonPayload) {
    return this._super(...arguments);
  },
  attrs: {
    vendor: { embedded: 'always' }
  }
});
