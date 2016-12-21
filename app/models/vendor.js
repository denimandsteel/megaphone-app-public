import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  image_url: DS.attr('string'),
  thumb_url: DS.attr('string'),
  cover_url: DS.attr('string'),
  profile_url: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  in_app: DS.attr('boolean'),
  has_back_issues: DS.attr('boolean'),
  badge_id: DS.attr('number'),
  updated_by_id: DS.attr('number'),
  products: DS.hasMany('product'),
  locations: DS.hasMany('location'),
  
  locationsByCity: function(city) {
    return this.get('locations').filterBy('city', city);
  },

  locationsByNeighbourhood: function(neighbourhood) {
    return this.get('locations').filterBy('neighbourhood', neighbourhood);
  },
  
  hasLocationInCity: function(city) {
    return this.locationsByCity(city).length > 0;
  },


});
