import React from 'react';
import Rayon from 'rayon';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import attendee from '../../stores/attendee';
import user from '../../stores/user';

export default React.createClass({
	getInitialState: function() {
		return {
			rsvpModalVisible: false,
			attendee: attendee,
			attStatusMessage: null,
			rsvpMsg: null,
			errorMsg: null,
			user: user
		};
	},
	componentWillMount: function() {
		this.state.attendee.on('change', this.updateAttendee);
		this.state.user.on('change', this.updateUser);
	},
	componentWillUnmount: function() {
		this.state.attendee.off('change', this.updateAttendee);
		this.state.user.off('change', this.updateUser);
	},
	render: function() {
		return(
			<div className='rsvpWrapper homeWrapper'>
				<h1 className="introHeader"><i>Received an Invite?</i></h1>
				<button className="modalOpenBtn rsvpBtn" onClick={this.openRsvpModal}><i>RSVP</i></button>
				<Rayon isOpen={this.state.rsvpModalVisible} onClose={this.closeRsvpModal}>
					{this.showRsvpJSX(this.state.attStatusMessage)}
				</Rayon>
				<button className="modalOpenBtn infoBtn" onClick={this.openRsvpModal}><i>Event Info</i></button>
			</div>
				);
	},
	updateUser: function() {
		this.setState({
			user: this.state.user
		});
	},
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
					<h3 className="formPrompt">Number Attending</h3>
					<input className="modalInput" type='number' min='0' max={this.state.attendee.get('maxGuests')} ref='party'/>
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
					<p className="error">{this.state.rsvpMsg}</p>
					<p className="error">{this.state.errorMsg}</p>
					<h3 className="formPrompt">Your Name</h3>
					<input className="modalInput" type='text' placeholder='As appears on invite' ref='name'/>
					<h3 className="formPrompt">Please Enter Your Access Code</h3>
					<input className="modalInput modalAccessInput" type='text' ref='accessCode'/>
					<button className="verifyBtn" onClick={this.verify}>Enter</button>
				</div>
				{whenVerified}
			</form>
			);
		} else {
			return (
			<h1 className="successMsg">{attStatusMessage}</h1>
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
		            name: (this.refs.name.value).toLowerCase(),
		            accessCode: this.refs.accessCode.value
		        }
		    },
		    success: (entry) => {
		    	this.state.attendee.set(entry[0]);
		    	if (!this.state.attendee.get('id')) {
		    		this.setState({
		    			errorMsg: 'The information you entered was not found.  Please verify and re-enter.'
		    		});
		    	} else if (this.state.attendee.get('isGoing')) {
	    		 	this.setState({
			            rsvpModalVisible: false
			        });
		    		browserHistory.push('/attendees');
		    	}
		    }
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