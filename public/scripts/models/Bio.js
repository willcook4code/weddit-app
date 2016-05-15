import Backbone from 'backbone';

export default Backbone.Model.extend({
	defaults: {
		registrant1: '',
		registrant2: '',
		pic: '',
		story: '',
		registry1: '',
		registry2: ''
	},
	urlRoot: '/api/v1/bio',
	idAttribute: 'id'
});