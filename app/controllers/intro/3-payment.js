import Ember from 'ember';
import config from '../../config/environment';
import appServer from '../../lib/app-server';

export default Ember.Controller.extend({
  isLoading: false,

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
      this.updateCreditCardInfo(card_number, card_expiry_month, card_expiry_year, card_cvc);
    }
  }
});
