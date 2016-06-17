import Backbone from 'backbone';

export default Backbone.Model.extend({
	defaults: {
		name: '',
		zip: '',
		locationType: '',
		hotelUrl: '',
		phoneNumber: '',
		rate: '',
		cutoffDate: null
	},
	urlRoot: '/api/v1/accommodation',
	idAttribute: 'id'
});