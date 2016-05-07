import React from 'react';
import Rayon from 'rayon';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import attendee from '../../models/attendee';

export default React.createClass({
	getInitialState: function() {
		return {
			rsvpModalVisible: false,
			infoModalVisible: false,
			attendee: new attendee,
			attStatusMessage: null
		};
	},
	componentWillMount: function() {
		this.state.attendee.on('change', () => {
			this.setState({
				attendee: this.state.attendee
			});
		});
	},
	render: function() {
		console.log('render');
		return(
			<div className='attendeeLogin'>
					<h1 className='loginType'>Attendee Links</h1>
					<button className='attendeeLink' onClick={this.openRsvpModal}>RSVP</button>
					<Rayon isOpen={this.state.rsvpModalVisible} onClose={this.closeRsvpModal}>
						{this.showRsvpJSX(this.state.attStatusMessage)}
					</Rayon>
					<button className='attendeeLink' onClick={this.openInfoModal}>Event Info</button>
					<Rayon isOpen={this.state.infoModalVisible} onClose={this.closeInfoModal}>
						<form onSubmit={this.closeInfoModal}>
							<p>Info Link</p>
							<h3>Please Enter Your Access Code</h3>
							<input type='text'/>
							<footer>
								<button>Go to Info Page</button>
							</footer>
						</form>
					</Rayon>
				</div>
				);
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
			attStatusMessage: 'Your RSVP has been logged'
		});
	},
	verify: function(e) {
		e.preventDefault();
		$.ajax({
		    url: '/api/v1/public/attendee',
		    method: 'get',
		    accepts: 'application/json',
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

