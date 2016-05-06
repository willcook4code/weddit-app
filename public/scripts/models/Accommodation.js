import Backbone from 'backbone';

export default Backbone.Model.extend({
	defaults: {
		hotelName: '',
		hotelZip: '',
		hotelUrl: '',
		rate: '',
		cutoffDate: null
	},
	urlRoot: '/api/v1/public/accommodation',
	idAttribute: 'id'
});