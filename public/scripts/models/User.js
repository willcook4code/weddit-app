import Backbone from 'backbone';

export default Backbone.Model.extend ({
	defaults:{
		registrant1: '',
		registrant2: '',
		email: '',
		createdAt: null,
		updatedAt: null,
		deletedAt: null
	},
	urlRoot: '/api/v1/user',
	idAttribute: 'id'

});
