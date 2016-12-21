import Ember from 'ember';

export default Ember.Component.extend({
  carouselProducts: [],
  index: 0,
  moved: false,
  updateProducts(product) {
    this.set('carouselProducts', this.get('carouselProducts').map((item) => {
      item.set('active', item.id === product.get('id'));
      return item;
    }));
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('carouselProducts', this.get('products'));
    // this.updateProducts(this.get('products.firstObject'));
  },
  didInsertElement() {
    this._super(...arguments);

    var $wrap = this.$('.product-list .wrap');
    var $slides = this.$('.product-list .product-item');
    var width = $slides.width();
    var touchstartx;
    var touchmovex;
    var movex;
    var pagePadding = $(window).width() * 40/750;

    if ('ontouchstart' in document.documentElement) {
      this.$('.product-list').on('touchstart', (event) => {
        touchstartx =  event.originalEvent.touches[0].pageX;
        $wrap.removeClass('animate');
        return false;
      });
      this.$('.product-list').on('touchmove', (event) => {
        this.moved = true;
        touchmovex =  event.originalEvent.touches[0].pageX;
        movex = this.index * width + (touchstartx - touchmovex);
        $wrap.css('transform','translate3d(' + -1 * (movex  + this.index * pagePadding ) + 'px,0,0)');
        return false;
      });
      this.$('.product-list').on('touchend', (event) => {
        if (this.moved) {
          if (Math.abs(this.index * width - movex) > width / 4) {
            if (movex > this.index * width && this.index < $slides.length - 1) {
              this.index += 1;
            }
            else if (movex < this.index * width && this.index > 0) {
              this.index -= 1;
            }
          }
        }
        else {
          // Simulate a click on the cover image.
          var itemIndex = this.$('.product-item').index($(event.target).parents('.product-item'));
          if (itemIndex !== -1) {
            this.index = itemIndex;
          }
        }
        if (this.index < 0) {
          this.index = 0;
        }
        $wrap.addClass('animate').css('transform', 'translate3d(-' + (this.index * width + this.index * pagePadding ) + 'px,0,0)');
        this.$('.product-description .wrap').css('transform', 'translate3d(' + (this.index * -100) + '%,0,0)');
        // this.updateProducts(this.get('carouselProducts').get(this.index));
        // this.$('.pro')
        this.moved = false;
        return false;
      });
    }
    else {
      this.$('.product-item').on('click', (event) => {
        this.index = this.$('.product-item').index($(event.target).parents('.product-item'));
        // console.log(this.index);
        $wrap.addClass('animate').css('transform', 'translate3d(-' + (this.index * width + this.index * pagePadding ) + 'px,0,0)');
        this.$('.product-description .wrap').css('transform', 'translate3d(' + (this.index * -100) + '%,0,0)');
      });
    }

  },
  actions: {
    show_product(product) {
      this.updateProducts(product);
      this.index = this.carouselProducts.indexOf(product);
      this.$('.product-list .wrap').addClass('animate').css('transform', 'translate3d(-' + (this.index * this.$('.product-list .product-item').width() + this.index * ($(window).width() * 40/750) ) + 'px,0,0)');
    },
  }

});
