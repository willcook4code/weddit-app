import Backbone from 'backbone';

export default Backbone.Model.extend({
	defaults: {
		name: '',
		zip: '',
		locationType: '',
		hotelUrl: '',
		rate: '',
		cutoffDate: null
	},
	urlRoot: '/api/v1/accommodation',
	idAttribute: 'id'
});