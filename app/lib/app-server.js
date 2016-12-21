import Ember from 'ember';
import config from '../config/environment';
/* global Stripe */

export default {
  updateCreditCardInfo: function(device, apiToken, cardNumber, cardExpiryMonth, cardExpiryYear, cardCVC, callback) {

    var createStripeCardToken = function(cardNumber, cardExpiryMonth, cardExpiryYear, cardCVC) {
      Stripe.setPublishableKey(config.stripePublishableKey);
      Stripe.card.createToken({
        number: cardNumber,
        cvc: cardCVC,
        exp_month: cardExpiryMonth,
        exp_year: cardExpiryYear
      }, (status, response) => {
        stripeResponseHandler(status, response);
      });
    };

    var stripeResponseHandler = function(status, response) {
      if (response.error) {
        callback(response.error);
      } else { 
        var stripeCardToken = response.id;
        var lastFourDigits = response.card.last4;

        Ember.$.ajax({
          type: "PUT",
          url: config.serverHost + "/devices/" + device.get('id'),
          beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Token " + apiToken);
          },
          data: { 
                  stripe_card_token : stripeCardToken,
                  last_four_digits: lastFourDigits
                },
          success: function(data) {
            callback(null, data);
          },
          error: function(errMsg) {
            callback(errMsg);
          }
        });

      }
    };

    createStripeCardToken(cardNumber, cardExpiryMonth, cardExpiryYear, cardCVC, callback);

  },
};