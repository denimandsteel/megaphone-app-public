import Ember from 'ember';

export default Ember.Component.extend({
  highlightedNeighbourhoods: [],
  
  isVancouver: function() {
    return (this.get('city') === 'Vancouver');
  }.property('city'),

  isVictoria: function() {
    return (this.get('city') === 'Victoria');
  }.property('city'),

  cityChanged: function() {
    var that = this;
    Ember.run.later(function() {
      that.didInsertElement();
    }, 100);
  }.observes('city'),

  activeNeighbourhoodsChanged: function() {
    var that = this;
    Ember.run.later(function() {
      that.didInsertElement();
    }, 100);
  }.observes('activeNeighbourhoods.[]'),

  didInsertElement: function() {
    var that = this;

    // highlight a neighbourhood
    function selectNeighourhoodWithId(neighbourhoodId) {
      $('#' + neighbourhoodId).addClass('active');
    }

    // enable a neighbourhood
    function enableNeighourhoodWithId(neighbourhoodId) {
      $('#' + neighbourhoodId).addClass('enabled');
    }

    this.$('svg path').each(function() {
      var neighbourhoodId = $(this).attr('id');
      if (that.activeNeighbourhoods.indexOf(neighbourhoodId) >= 0) {
        enableNeighourhoodWithId(neighbourhoodId);
      }
      else {
        
      }
    });

    this.$('svg path').unbind('click').click(function() {
      var neighbourhoodId = $(this).attr('id');
      
      if (that.activeNeighbourhoods.indexOf(neighbourhoodId) < 0) { return; }
      
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        var removeIndex = that.highlightedNeighbourhoods.indexOf(neighbourhoodId);
        if (removeIndex > -1) {
          that.highlightedNeighbourhoods.splice(removeIndex, 1);
        }
      }
      else {
        selectNeighourhoodWithId(neighbourhoodId);
        that.highlightedNeighbourhoods.unshift(neighbourhoodId);
        $.unique(that.highlightedNeighbourhoods);
      }
      if ($('.neighbourhood').length > 0) {
        $('#vendor-hint').hide();
      }
      else {
        $('#vendor-hint').show();
      }
      that.get('onNeighbourhoodChange')();
    });
  },
  actions: {
    findVendorsNearMe: function() {
      this.get('findVendorsNearMe')();
    }
  }

});
