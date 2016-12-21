import Ember from 'ember';

export default Ember.Component.extend({
  touchStart: function() {
    this.sendAction();
  }
});
