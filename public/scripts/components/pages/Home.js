import React from 'react';
import user from '../../stores/user';
import Attendee from './AttendeeLinks';
import Login from './Login';

export default React.createClass({
	getInitialState: function() {
		return {
			regModalVisible: false,
			rsvpModalVisible: false,
			infoModalVisible: false,
			user: user
		};
	},
	render: function() {
		return(
			<section className='homePage'>
				<Login />
				<Attendee />
			</section>
			);
	}
});