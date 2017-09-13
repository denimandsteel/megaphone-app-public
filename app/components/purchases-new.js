import Ember from 'ember';

export default Ember.Component.extend({
  isLoading: false,
  tips: 0,

  prefersCreditCard: Ember.computed.equal('model.device.preferred_payment_method', 'creditcard'),
  prefersApplePay: Ember.computed.equal('model.device.preferred_payment_method', 'applepay'),

  didInsertElement: function() {
    this.$('.bottom').hide();
    this.$('.bottom').delay(500).fadeIn(500);
    this.setupScroll();
  },

  hasSetupPayment: function() {
    var device = this.get('model').device;
    return (device.get('stripe_customer') && device.get('stripe_customer').length > 0);
  }.property('model.device'),


  setupScroll: function() {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 3;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(event) {
      hasScrolled();
    });

    $(window).bind('touchmove', function(event) {
      hasScrolled();
    });

    function hasScrolled() {
      // var st = $('body').scrollTop();
      // if (st > lastScrollTop && st > navbarHeight){
      //   // Scrolled Down
      //   $('.vendor-drawer').addClass('hidden');
      //   $('.vendor-drawer.compact').removeClass('hidden');
      // } else if (st < navbarHeight) {
      //   // Scrolled Up
      //   if(st + $(window).height() < $(document).height()) {
      //     $('.vendor-drawer').removeClass('hidden');
      //     $('.vendor-drawer.compact').addClass('hidden');
      //   }
      // }
      // lastScrollTop = st;
    }
  },

  totalProductAmount: function() {
    return this.get('model').products.toArray().reduce(function(total, product) { 
      return total + Number(product.get('totalPrice')); 
    }, 0);
  }.property('model.products.@each.totalPrice'),

  totalPlusTip: function() {
    return Number(this.get('totalProductAmount')) + Number(this.tips);
  }.property('totalProductAmount', 'tips'),

  // Based on:
  // https://support.stripe.com/questions/can-i-charge-my-stripe-fees-to-my-customers
  transactionFee: function() {
    return this.get('totalPlusTip') > 0 ? (this.get('totalPlusTip') + 30) / (1 - 0.029) - this.get('totalPlusTip') : 0;
  }.property('totalPlusTip'),

  totalPayableAmount: function() {
    return this.get('totalPlusTip') + this.get('transactionFee');
  }.property('totalPlusTip', 'transactionFee'),

  hasTip: function() {
    return this.tips > 0;
  }.property('tips'),

  canPurchase: function() {
    return this.get('totalPayableAmount') > 0;
  }.property('totalPayableAmount'),

  resetProductAmounts: function() {
    return this.get('model').products.toArray().forEach(function(product) { 
      product.set('quantity', 0);
    });
  },

  updateApplePayInfo: function(applePayStripeToken) {
    appServer.updateApplePayInfo(this.model, this.get('preferences.api_token'), applePayStripeToken, function(error, data) {
      if (error) {
        that.set('flashMessage', error.responseText);
      } else {
        that.set('flashMessage', '');
        that.model.reload();
      }
      that.set('isLoading', false);
    });
  },

  actions: {
    addOne: function(product) {
      product.set('quantity', product.get('quantity') + 1);
    },

    removeAll: function(product) {
      product.set('quantity', 0);
    },

    addTip: function(amount) {
      this.set('tips', this.tips + amount);
    },

    removeAllTips: function() {
      this.set('tips', 0);
    },

    makePayment: function() {
      var that = this;
      var confirmCallback = function(button) {
        if (button === 2) {
          $("html, body").animate({ scrollTop: $(document).height() }, "slow");
          that.set('isLoading', true);
          var purchase = that.store.createRecord('purchase');
          purchase.set('vendor', that.get('model.vendor'));
          purchase.set('products', that.get('model').products);
          purchase.set('tips', that.tips);
          purchase.set('products_amount', that.get('totalProductAmount'));
          purchase.set('payment_method', 'creditcard');
          purchase.save().then(function(saved_purchase) {
            that.set('isLoading', false);
            that.resetProductAmounts();
            that.get('router').transitionTo('purchases/success', {queryParams: {purchase_id: saved_purchase.get('id')}});  
          }, function(err) {
            // that.set('flashMessage', typeof err.errors !== 'undefined' ? err.errors[0].detail : err);
            that.set('flashMessage', "Sorry, we can't process this credit card.");
            that.set('isLoading', false);
          });
        } else {
          that.set('isLoading', false);
        }
      };
      if (navigator.notification) {
        navigator.notification.confirm("Your credit card will now be charged.", confirmCallback, "Ready to Pay?", ["Cancel", "Pay"]);
      } else {
        confirmCallback(2);
      }
    },

    applePayTransactionComplete: function(applePayStripeToken) {
      var that = this;
      console.log('got token: ', applePayStripeToken);
      this.set('model.device.apple_pay_token', applePayStripeToken);
      this.get('model.device').save().then((device) => {
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        that.set('isLoading', true);
        var purchase = that.store.createRecord('purchase');
        purchase.set('vendor', that.get('model.vendor'));
        purchase.set('products', that.get('model').products);
        purchase.set('tips', that.tips);
        purchase.set('products_amount', that.get('totalProductAmount'));
        purchase.set('payment_method', 'applepay');
        purchase.save().then(function(saved_purchase) {
          that.set('isLoading', false);
          that.resetProductAmounts();
          that.get('router').transitionTo('purchases/success', {queryParams: {purchase_id: saved_purchase.get('id')}});  
        }, function(err) {
          // that.set('flashMessage', typeof err.errors !== 'undefined' ? err.errors[0].detail : err);
          that.set('flashMessage', "Sorry, we can't process this credit card.");
          that.set('isLoading', false);
        });
      });
      
    }
  }
});
