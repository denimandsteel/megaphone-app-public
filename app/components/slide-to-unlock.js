import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    var that = this;
    this._super(...arguments);

    var $container = this.$('.slider-container');
    var $slider = this.$('.slider');
    var $instruction = this.$('.instruction');
    var containerWidth = $container.width();
    var containerPadding = $container.innerWidth() - $container.width();
    var sliderWidth = $slider.width();
    var touchstartx;
    var touchmovex;
    var movex;
    
    if ('ontouchstart' in document.documentElement) {
      this.$('.slider').on('touchstart', (event) => {
        touchstartx =  event.originalEvent.touches[0].pageX;
        $slider.removeClass('animate');
        return false;
      });
      this.$('.slider').on('touchmove', (event) => {
        this.moved = true;
        touchmovex =  event.originalEvent.touches[0].pageX;
        movex = Math.max(touchmovex - touchstartx, 0);
        $slider.css('transform','translate3d(' + movex + 'px,0,0)');
        $instruction.addClass('animate').css('opacity', 1 - movex / (containerWidth - sliderWidth));
        return false;
      });
      this.$('.slider').on('touchend', (event) => {
        if (this.moved) {
          if (movex > containerWidth * 3 / 4) {
            $slider.addClass('animate').css('transform', 'translate3d(' + (containerWidth - sliderWidth) + 'px,0,0)');
            $instruction.addClass('animate').css('opacity', '0');
            $container.css('background-color', '#2A4ED2');
            setTimeout( function() {
              // $container.fadeOut("slow", function() {
              $('.thank-you').slideDown("slow");
              setTimeout( that.get('doneSliding'), 2000 );
              // });
            }, 1000);
          } else {
            // move slider back to the left
            $slider.addClass('animate').css('transform', 'translate3d(' + (0) + 'px,0,0)');
            $instruction.addClass('animate').css('opacity', '1');
          }
        }

        
        this.moved = false;
        return false;
      });
    }
  },
});
