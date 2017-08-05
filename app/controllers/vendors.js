import Ember from 'ember';
/* global _ */

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  vendors: Ember.computed.alias("applicationController.vendors"),
  highlightedNeighbourhoods: Ember.A(),
  activeNeighbourhoods: Ember.A(),
  _locationsByNeighbourhood: Ember.A(),
  
  isInMapMode: function() {
    return (this.get('viewmode') === 'map');
  }.property('viewmode'),

  changedToMapMode: function() {
    if (this.get('isInMapMode')) {
      this.set('highlightedNeighbourhoods', Ember.A());
    }
  }.observes('viewmode'),

  isVancouver: function() {
    return (this.get('city') === 'Vancouver');
  }.property('city'),

  isVictoria: function() {
    return (this.get('city') === 'Victoria');
  }.property('city'),

  vendorsByCity: function() {
    if (this.get('isVancouver')) {
      return this.get('vancouverVendors');
    } else {
      return this.get('victoriaVendors');
    }
  }.property('isVancouver', 'vancouverVendors', 'victoriaVendors'),

  cityChanged: function() {
    // TODO highlightedNeighbourhoods should be a computed property based on the current city.
    this.set('highlightedNeighbourhoods', Ember.A());
    // hide current position marker
    $('#current-position').removeClass('active');
  }.observes('city'),

  // updateActiveNeighbourhoods: function() {
  //   var that = this;
  //   this.set('activeNeighbourhoods', Ember.A());
  //   this.get('vendorsByCity').toArray().forEach(function(vendor) {
  //     vendor.get('locations').then(function(locations) {
  //       locations.toArray().forEach(function(location) {
  //         if (that.activeNeighbourhoods.indexOf(location.get('neighbourhood')) < 0) {
  //           that.activeNeighbourhoods.pushObject(location.get('neighbourhood'));
  //         }
  //       });
  //     });
  //   });
  // }.observes('city', 'vendorsByCity'),

  locationsByNeighbourhood: function() {
    var that = this;
    
    _.pluck(this._locationsByNeighbourhood, 'neighbourhood').forEach(function(neighbourhood, index) {
      if (that.highlightedNeighbourhoods.indexOf(neighbourhood) < 0) {
        that._locationsByNeighbourhood.splice(index, 1);
      }
    });

    this.highlightedNeighbourhoods.toArray().forEach(function(neighbourhood) {
      if (that._locationsByNeighbourhood.map(function(a) {return a.neighbourhood;}).indexOf(neighbourhood) < 0) {
        that._locationsByNeighbourhood.unshift({neighbourhood: neighbourhood, locations: that.store.peekAll('location').filter( (location) => { return location.get('city') === that.city && location.get('neighbourhood') === neighbourhood; } )});  
      }
    });
    return this._locationsByNeighbourhood;
  }.property('highlightedNeighbourhoods.[]'),

  noNeighbourhoodSelected: function() {
    return this.highlightedNeighbourhoods.length < 1;
  }.property('highlightedNeighbourhoods.[]'),

  actions: {
    switch_to_names: function() {
      this.set('viewmode', 'name');
      if (typeof window.analytics !== 'undefined') {
        window.analytics.trackEvent('Navigation', 'SwitchedToNames');
      }
    },
    switch_to_map: function() {
      this.set('viewmode', 'map');
      if (typeof window.analytics !== 'undefined') {
        window.analytics.trackEvent('Navigation', 'SwitchedToMap');
      }
    },
    switch_to_vancouver: function() {
      this.set('city', 'Vancouver');
    },
    switch_to_victoria: function() {
      this.set('city', 'Victoria');
    },
    highlightedNeighbourhoodsUpdated: function() {
      this.notifyPropertyChange('highlightedNeighbourhoods');
    },
    payVendor: function(vendor) {
      this.transitionToRoute('purchase', { queryParams: { vendor: vendor.get('id') }});
    },
    findVendorsNearMe: function() {
      var that = this;
      // onSuccess Callback
      // This method accepts a Position object, which contains the
      // current GPS coordinates
      //
      var onSuccess = function(position) {
          var latPercent = null, lonPercent = null;
          if (that.get('isVancouver')) {
            latPercent = (position.coords.latitude - 49.3158)/(49.1961 - 49.3158);
            lonPercent = (position.coords.longitude + 123.2342)/(-123.0229 + 123.2342);
          }
          else {
            latPercent = (position.coords.latitude - 48.4542)/(48.3994 - 48.4542);
            lonPercent = (position.coords.longitude + 123.4055)/(-123.3128 + 123.4055);
          }

          $('#current-position').css({ top: (latPercent * (556 / 640) * 100) + 'vw', left: (lonPercent * 100) +'vw' }).addClass('active');

          var nearby = document.querySelectorAll('svg.' + that.get('city').toLowerCase())[0].createSVGRect();
          nearby.x = (lonPercent * window.innerWidth);
          nearby.y = (latPercent * window.innerWidth * (556 / 640));
          nearby.width = window.innerWidth * (60 / 640);
          nearby.height = window.innerWidth * (60 / 640);
          var list = document.querySelectorAll('svg.' + that.get('city').toLowerCase())[0].getIntersectionList(nearby, null);
          for (var i = 0; i < list.length; i++) {
            if ($(list[i]).attr('class') !== 'active') {
              $(list[i]).click();
            }
          }
      };

      // onError Callback receives a PositionError object
      //
      function onError(error) {
        console.log('Location error: code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }
});
