import Backbone from 'backbone';
import Accommodation from './../models/Accommodation.js';

const AccommodationCollection = Backbone.Collection.extend({
	model: Accommodation,
	url: '/api/v1/accommodation'
});

export default new AccommodationCollection();