import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  city: DS.attr('string'),
  neighbourhood: DS.attr('string'),
  cross_street: DS.attr('string'),
  hours: DS.attr('string'),
  vendor: DS.belongsTo('vendor'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),

  hasName: function() {
    return this.get('name') && this.get('name').length > 0;
  }.property('name'),
  hasCrossStreet: function() {
    return this.get('cross_street') && this.get('cross_street').length > 0;
  }.property('cross_street'),
  hasDescription: function() {
    return this.get('description') && this.get('description').length > 0;
  }.property('description'),
  hasHours: function() {
    return this.get('hours') && this.get('hours').trim().length > 0;
  }.property('hours'),
  hasSpeechBubble: function() {
    return this.get('hasHours') || this.get('hasDescription');
  }.property('hasHours', 'hasDescription')
});
