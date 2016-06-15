import Backbone from 'backbone';

export default Backbone.Model.extend({
	defaults: {
		pic: '',
		name: '',
		caption: '',
		inSlideshow: true
	},
	urlRoot: '/api/v1/scrapbook',
	idAttribute: 'id'
});