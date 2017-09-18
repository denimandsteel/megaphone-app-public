import DS from 'ember-data';

export default DS.Model.extend({
  purchases: DS.hasMany('purchase'),

  stripe_customer: DS.attr('string'),
  api_token: DS.attr('string'),
  push_notification_token: DS.attr('string'),
  enable_notifications: DS.attr('boolean'),
  enable_location: DS.attr('boolean'),
  last_four_digits: DS.attr('string'),
  card_token: DS.attr('string'),
  apple_pay_token: DS.attr('string'),
  preferred_payment_method: DS.attr('string'),

  hasSetupPayment: function() {
    return (this.get('stripe_customer').length > 0);
  }.property('stripe_customer'),
});
