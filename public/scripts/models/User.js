import Backbone from 'backbone';

const UserModel = Backbone.Model.extend ({
	defaults:{
		registrant1: '',
		registrant2: '',
		email: '',
		venueName: '',
		venueZip: '',
		createdAt: null,
		updatedAt: null,
		deletedAt: null,
	},
	urlRoot: '/api/v1/user',
	idAttribute: 'id'

});


 export default new UserModel(window.user);