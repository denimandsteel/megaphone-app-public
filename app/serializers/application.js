import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  keyForRelationship: function(key, relationship) {
    if (relationship === 'belongsTo') {
      return key + '_id';
    } else {
      return this._super(...arguments);
    }
  },
});
