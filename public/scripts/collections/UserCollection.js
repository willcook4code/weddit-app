import Backbone from 'backbone';
import User from './../models/User.js';

const UserCollection = Backbone.Collection.extend({
	model: User,
	url: '/api/v1/user'
});

export default new UserCollection();