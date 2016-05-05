import Backbone from 'backbone';
import Attendee from './../models/Attendee.js';

const AttendeeCollection = Backbone.Collection.extend({
	model: Attendee,
	url: '/api/v1/attendee'
});

export default new AttendeeCollection();