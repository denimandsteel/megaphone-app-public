import Ember from 'ember';
import NavBarMixin from 'ember-cli-cordova/mixins/controllers/nav-bar';

export default Ember.Controller.extend(NavBarMixin, {
  products: Ember.A,
  vendors: Ember.A,
  classPath: '',
  megaphoneHistory: [],

  hasHistory: function(){
    return this.get('megaphoneHistory.length') > 1;
  }.property('megaphoneHistory.length'),

  watchHistory: function() {
    // if currentPath already exists in history, pop everything up to that point
    if (this.get('currentPath').indexOf('loading') >= 0) {
      return;
    }
    var repeatIndex = $.inArray(this.get('currentPath'), this.get('megaphoneHistory'));
    if (repeatIndex > -1 ) {
      this.set('megaphoneHistory', this.get('megaphoneHistory').slice(0, repeatIndex + 1));
    } else {
      this.get('megaphoneHistory').pushObject(this.get('currentPath'));
    }
  }.observes('currentPath'),

  changePath: function() {
    this.set('classPath', this.currentPath.replace(/\//, '-').replace(/\./, '-'));
  }.observes('currentPath'),

  actions: {
    goBack: function() {
      if (this.get('hasHistory')) {
        this.get('megaphoneHistory').popObject(); // dismiss current path
        var previousPath = this.get('megaphoneHistory').popObject();
        this.transitionToRoute(previousPath);
      } else {
        if (window.cordova) {
          navigator.app.exitApp();
        } else {
          this.transitionToRoute('dashboard');
        }
        
      }
    }
  }
});
