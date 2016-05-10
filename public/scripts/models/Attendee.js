import Backbone from 'backbone';

export default Backbone.Model.extend({
	defaults: {
		name: '',
		accessCode: '',
		party: 0,
		maxGuests: '',
		isGoing: null
	},
	urlRoot: '/api/v1/attendee',
	idAttribute: 'id'
});