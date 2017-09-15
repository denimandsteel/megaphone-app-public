import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  taps: 0,
  showReset: false,

  hasPreviousPurchases: function() {
    return this.get('model').get('length') > 0;
  }.property('model.[]'),
  
  actions: {
    secretTap: function() {
      this.set('taps', this.get('taps') + 1);
      if (this.get('taps') > 5) {
        this.set('showReset', true);
      }
    },
    resetPersonalInfo: function() {
      this.set('preferences.seen_onboarding', false);      
      this.set('preferences.api_token', undefined);
      this.store.unloadAll();
      this.transitionToRoute('index');
    }
  }
});