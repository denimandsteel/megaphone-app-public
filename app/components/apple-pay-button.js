import Ember from 'ember';
import config from '../config/environment';
/* global ApplePay */

export default Ember.Component.extend({
  tagName: 'button',
  classNames: ['apple-pay-button'],
  classNameBindings: ['canPurchase::disabled'],
  
  canPurchase: function() {
    return this.get('total') > 0;
  }.property('total'),

  didInsertElement() {
    if (window.ApplePay) {
      ApplePay.canMakePayments()
      .then((message) => {
        // Apple Pay is enabled and a supported card is setup. Expect:
        // 'This device can make payments and has a supported card'
        this.$().css('display', 'block');
      })
      .catch((message) => {
        // There is an issue, examine the message to see the details, will be:
        // 'This device cannot make payments.''
        // 'This device can make payments but has no supported cards'
        this.$().css('display', 'none');
      });  
    } else {
      this.$().css('background-color', 'red');
      this.$().css('display', 'none');
    }
  },

  touchStart: function(event) {
    ApplePay.makePaymentRequest(
    {
      items: [
        {
          label: 'Total',
          amount: this.get('total') / 100
        },
      ],
      shippingMethods: [
      ],
      merchantIdentifier: config.applePay.merchantIdentifier,
      currencyCode: config.applePay.currencyCode,
      countryCode: config.applePay.countryCode,
      billingAddressRequirement: 'none',
      shippingAddressRequirement: 'none',
      shippingType: 'none'
    })
    .then((paymentResponse) => {
      // User approved payment, token generated.
      console.log('payment response:');
      console.log(paymentResponse);

      this.get('onTransactionComplete')(paymentResponse.stripeToken);

      ApplePay.completeLastTransaction('success');
    })
    .catch((message) => {
      // Error or user cancelled.
      console.log('message:');
      console.log(message);
      ApplePay.completeLastTransaction('failure');
    });
  }
});