import Backbone from 'backbone';
import Request from './../models/Request.js';

const RequestCollection = Backbone.Collection.extend({
	model: Request,
	url: '/api/v1/request'
});

export default new RequestCollection();