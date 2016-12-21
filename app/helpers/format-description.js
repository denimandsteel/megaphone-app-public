import Ember from 'ember';

export function formatDescription(params/*, hash*/) {
  return params[0].replace(/[\n\r]/, '<br><br>');
}

export default Ember.Helper.helper(formatDescription);
