import Backbone from 'backbone';

export default Backbone.Model.extend({
	defaults: {
		trackId: '',
		pic: '',
		title: '',
		band: '',
		requestCount: 1
	},
	urlRoot: '/api/v1/public/request',
	idAttribute: 'id'
});