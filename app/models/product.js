import DS from 'ember-data';

export default DS.Model.extend({
  price: DS.attr('number'),
  description: DS.attr('string'),
  title: DS.attr('string'),
  in_app: DS.attr('boolean'),
  image_url: DS.attr('string'),
  thumb_url: DS.attr('string'),
  cover_url: DS.attr('string'),
  profile_url: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  category: DS.attr('string'),
  quantity: DS.attr('number', { defaultValue: 0 }),
  order: DS.attr('number'),

  totalPrice: function() {
    return this.get('quantity') * this.get('price');
  }.property('price', 'quantity'),

  isTip: function() {
    return (this.get('title') === 'Tip');
  }.property('title'),

  hasQuantity: function() {
    return this.get('quantity') > 0;
  }.property('quantity')
});
