import DS from 'ember-data';

export default DS.Model.extend({
  device: DS.belongsTo('device'),
  vendor: DS.belongsTo('vendor'),
  products: DS.hasMany('product'),
  products_amount: DS.attr('number'),
  tips: DS.attr('number', { defaultValue: 0 }),
  transaction_id: DS.attr('string'),
  created_at: DS.attr('date', {}),
  paid: DS.attr('boolean'),
  paid_at: DS.attr('date', {}),
  
  totalAmount: function() {
    return this.get('tips') + this.get('products_amount');
  }.property('tips', 'products_amount'),
});
