import DS from 'ember-data';

export default DS.Model.extend({
  payment_token: DS.attr('string'),
  api_token: DS.attr('string'),
  push_notification_token: DS.attr('string'),
  enable_notifications: DS.attr('boolean'),
  enable_location: DS.attr('boolean'),
  last_four_digits: DS.attr('string'),
  purchases: DS.hasMany('purchase'),
  hasSetupPayment: function() {
    return (this.get('payment_token').length > 0);
  }.property('payment_token'),
});
