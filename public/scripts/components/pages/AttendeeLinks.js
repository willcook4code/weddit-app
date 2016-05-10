import React from 'react';
import Rayon from 'rayon';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import attendee from '../../stores/attendee';
// import user from '../../stores/user';

export default React.createClass({
	getInitialState: function() {
		return {
			infoModalVisible: false,
			rsvpModalVisible: false,
			attendee: attendee,
			attStatusMessage: null
			// user: user
		};
	},
	componentWillMount: function() {
		this.state.attendee.on('change', this.updateAttendee);
		// this.state.user.on('change', this.updateUser);
	},
	componentWillUnmount: function() {
		this.state.attendee.off('change', this.updateAttendee);
		// this.state.user.off('change', this.updateUser);
	},
	render: function() {
		return(
			<div className='attendeeLogin'>
				<h1 className='loginType'>Attendee Links</h1>
				<button className='attendeeLink' onClick={this.openRsvpModal}>RSVP</button>
				<Rayon isOpen={this.state.rsvpModalVisible} onClose={this.closeRsvpModal}>
					{this.showRsvpJSX(this.state.attStatusMessage)}
				</Rayon>
				<Rayon isOpen={this.state.infoModalVisible} onClose={this.closeInfoModal}>
					<form>
						<h3>Your Name</h3>
						<input type='text' placeholder='Please enter as appears on invite' ref='name'/>
						<h3>Please Enter Your Access Code</h3>
						<input type='text' ref='accessCode'/>
						<button onClick={this.toInfo}>Enter</button>
					</form>
				</Rayon>
				<button className='attendeeLink' onClick={this.openInfoModal}>Event Info</button>
			</div>
				);
	},
	// updateUser: function() {
	// 	this.setState({
	// 		user: this.state.user
	// 	});
	// },
	updateAttendee: function() {
		this.setState({
			attendee: this.state.attendee
		});
	},
	showRsvpJSX: function(attStatusMessage) {
		let whenVerified = null;
		if (this.state.attendee.get('accessCode')) {
			whenVerified = (
				<div className='whenVerified'>
					<h3>Number Attending</h3>
					<input type='number' min='0' max={this.state.attendee.get('maxGuests')} ref='party'/>
					<footer>
						<button onClick={this.attend}>Accept</button>
						<button onClick={this.decline}>Decline</button>
					</footer>
				</div>
				);
		}
		if (!attStatusMessage) {
		return (
			<form>
				<div>
					<p>RSVP Form</p>
					<h3>Your Name</h3>
					<input type='text' placeholder='Please enter as appears on invite' ref='name'/>
					<h3>Please Enter Your Access Code</h3>
					<input type='text' ref='accessCode'/>
					<button onClick={this.verify}>Enter</button>
				</div>
				{whenVerified}
			</form>
			);
		} else {
			return (
			<h3>{attStatusMessage}</h3>
			);
		}
	},
	toInfo: function(e) {
		e.preventDefault();
		$.ajax({
		    url: '/api/v1/attendee',
		    method: 'get',
		    data: {
		        where: {
		            name: this.refs.name.value,
		            accessCode: this.refs.accessCode.value
		        }
		    },
		    success: (entry) => {
		    	this.state.attendee.set(entry[0]);
		    	browserHistory.push('/attendees');
		    }
		});
	},
	attend: function(e) {
		e.preventDefault();
		this.state.attendee.save({
			party: this.refs.party.value,
			isGoing: true
		});
		browserHistory.push('/attendees');
	},
	decline: function(e) {
		e.preventDefault();
		this.state.attendee.save({
			party: 0,
			isGoing: false
		});
		this.setState({
			attStatusMessage: 'Ok, have a good life!'
		});
	},
	verify: function(e) {
		e.preventDefault();
		$.ajax({
		    url: '/api/v1/attendee',
		    method: 'get',
		    data: {
		        where: {
		            name: this.refs.name.value,
		            accessCode: this.refs.accessCode.value
		        }
		    },
		    success: (entry) => {
		    	this.state.attendee.set(entry[0]);
		    }
		});
	},
	openInfoModal: function() {
        this.setState({
            infoModalVisible: true
        });
    },
    closeInfoModal: function() {
        this.setState({
            infoModalVisible: false
        });
    },
	openRsvpModal: function() {
        this.setState({
            rsvpModalVisible: true
        });
    },
    closeRsvpModal: function() {
        this.setState({
            rsvpModalVisible: false
        });
    }
});