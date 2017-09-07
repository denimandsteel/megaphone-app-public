import Ember from 'ember';
import config from '../../config/environment';
import appServer from '../../lib/app-server';

export default Ember.Controller.extend({
  isLoading: false,
  canUseApplePay: false,

  init() {
    var that = this;
    if (window.ApplePay) {
      ApplePay.canMakePayments()
      .then((message) => {
        that.set('canUseApplePay', true);
      })
      .catch((message) => {
        that.set('canUseApplePay', false);
      });  
    } else {
      that.set('canUseApplePay', false);
    }
  },

  updateCreditCardInfo: function(card_number, card_expiry_month, card_expiry_year, card_cvc) {
    var that = this;
    this.set('isLoading', true);

    appServer.updateCreditCardInfo(this.model, this.get('preferences.api_token'), card_number, card_expiry_month, card_expiry_year, card_cvc, function(error, data) {
      if (error) {
        that.set('flashMessage', error.responseText);
      } else {
        that.set('flashMessage', '');
        that.transitionToRoute('dashboard');
        that.model.reload();
      }
      that.set('isLoading', false);
    });
  },

  actions: {
    useScannedCard: function(card_number, card_expiry_month, card_expiry_year, card_cvc) {
      this.model.set('preferred_payment_method', 'creditcard');
      this.updateCreditCardInfo(card_number, card_expiry_month, card_expiry_year, card_cvc);
    },

    useApplePay() {
      this.model.set('preferred_payment_method', 'applepay');
      this.model.save();
      that.transitionToRoute('dashboard');
    }
  }
});
