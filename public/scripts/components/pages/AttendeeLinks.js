import React from 'react';
import Rayon from 'rayon';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import attendee from '../../models/attendee';

export default React.createClass({
	getInitialState: function() {
		return {
			rsvpModalVisible: false,
			infoModalVisible: false
		};
	},
	render: function() {
		return(
			<div className='attendeeLogin'>
					<h1 className='loginType'>Attendee Links</h1>
					<button className='attendeeLink' onClick={this.openRsvpModal}>RSVP</button>
					<Rayon isOpen={this.state.rsvpModalVisible} onClose={this.closeRsvpModal}>
						<form onSubmit={this.closeRsvpModal}>
							<p>RSVP Form</p>
							<h3>Your Name</h3>
							<input type='text' placeholder='Please enter as appears on invite'/>
							<h3>Please Enter Your Access Code</h3>
							<input type='text'/>
							<h3>Number Attending</h3>
							<input type='number' min='0' max='4'/>
							<footer>
								<button>Accept</button>
								<button>Decline</button>
							</footer>
						</form>
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
	onAccept: function() {
		
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