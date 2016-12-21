import Ember from 'ember';
import NavBarMixin from 'ember-cli-cordova/mixins/routes/nav-bar';

export default Ember.Route.extend(NavBarMixin, {
  queryParams: {
    purchase_id: {
      refreshModel: true
    }
  },
  model: function(params) {
    return this.store.find('purchase', params.purchase_id);
  }, 
  nav: {
    title: {
      text: ''
    }
  }
});
