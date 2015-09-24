import Ember from 'ember';
import DS from 'ember-data';

var Operator = DS.Model.extend({
	feeds: DS.hasMany('feed', { async: true }),
	identifiers: DS.attr(),
	name: DS.attr('string'),
	short_name: DS.attr('string'),
	onestop_id: Ember.computed.alias('id'),
	country: DS.attr('string'),
	state: DS.attr('string'),
	metro: DS.attr('string'),
	website: DS.attr('string'),
	timezone: DS.attr('string'),
	created_at: DS.attr('date'),
	updated_at: DS.attr('date')
});


export default Operator;