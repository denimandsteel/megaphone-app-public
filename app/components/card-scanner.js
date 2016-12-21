import Ember from 'ember';
/* global CardIO */

export default Ember.Component.extend({
  canUseCamera: false,
  didInsertElement: function() {
    var that = this;
    var onCardIOCheck = function (canScan) {
      console.log("card.io canScan? " + canScan);
      that.set('canUseCamera', canScan);
    };

    if (typeof CardIO !== "undefined") {
      CardIO.canScan(onCardIOCheck);  
    } else {
      console.log('CardIO library not found!');
    }
  }, 
  actions: {
    scan: function() {
      var that = this;

      var cardIOResponseFields = [
        "cardType",
        "redactedCardNumber",
        "cardNumber",
        "expiryMonth",
        "expiryYear",
        "cvv"
      ];

      var onCardIOComplete = function(response) {
        console.log("card.io scan complete", response);
        for (var i = 0, len = cardIOResponseFields.length; i < len; i++) {
          var field = cardIOResponseFields[i];
          console.log(field + ": " + response[field]);
        }

        that.get('onCardComplete')(response.cardNumber, response.expiryMonth, response.expiryYear, response.cvv);
      };

      var onCardIOCancel = function() {
        console.log("card.io scan cancelled");
      };

      CardIO.scan({
          "requireExpiry": true,
          "requireCVV": true,
          "zip": true,
          "supressManual": false,
          "noCamera": !that.get('canUseCamera'),
          "suppressConfirmation": false,
          "hideCardIOLogo": true,
          "guideColor": "2A4ED2",  // $blue-medium: #2A4ED2
          "scanInstructions": "Center your card in these lines\n to complete the rectangle."
        },
        onCardIOComplete,
        onCardIOCancel
      );
    }
  }
});
