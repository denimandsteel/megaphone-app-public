import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    useLocation: function() {
      this.set('model.enable_location', true);
      this.get('model').save();
      this.transitionToRoute('intro/3-payment');
    }
  }
});
