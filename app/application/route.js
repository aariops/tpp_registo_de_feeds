import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		// pass in params here for searching
		return this.store.findAll('operator');
		return Ember.RSVP.hash({
            operators: this.store.findAll('operator'),
            feeds: this.store.findAll('feed')
        });
	}
});

// moving this out of the application route breaks the app
// no feed or operator models are accessed