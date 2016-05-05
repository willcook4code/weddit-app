import React from 'react';
import Rsvp from './Subcomponents/RsvpList';
import Rayon from 'rayon';
import Attendee from '../../collections/AttendeeCollection';
import user from '../../models/user';

export default React.createClass({
	getInitialState: function() {
		return {
			inviteModalVisible: false,
			hotelModalVisible: false,
			user: user
		};
	},
	componentDidMount: function() {
		this.state.user.on('add', () => {
			this.setState({
				user: user
			});
		});
	},
	render: function() {
		return(
			<section className='profilePage'>
				<div className='attendeesWrapper'>
					<h2>Attendees</h2>
					<Rsvp/>
				</div>
				<div className='infoEditsWrapper'>
					<button onClick={this.openInviteModal}>Add Invites</button>
					<Rayon isOpen={this.state.inviteModalVisible} onClose={this.closeInviteModal}>
						<form>
							<p>Invites Form</p>
							<h3>Primary Name</h3>
							<input type='text' placeholder='eg: Sam Smith' ref='name'/>
							<h3>Maximum Number of Guests</h3>
							<input type='text' placeholder='eg: 4' ref='max'/>
							<footer>
								<a href="#" onClick={this.enterAttendee}>Add</a>
								<button onClick={this.closeInviteModal}>Close</button>
							</footer>
						</form>
					</Rayon>
					<button onClick={this.openHotelModal}>Add Hotel</button>
					<Rayon isOpen={this.state.hotelModalVisible} onClose={this.closeHotelModal}>
						<form onSubmit={this.closeHotelModal}>
							<p>Add Hotel Form</p>
							<h3>Property Name</h3>
							<input type='text' placeholder='eg: Sheraton'/>
							<h3>Zip Code</h3>
							<input type='text' placeholder='eg: 78701'/>
							<h3>Website</h3>
							<input type='text' placeholder='eg: www.sheraton.com'/>
							<h3>Rate</h3>
							<input type='text' placeholder='eg: $99'/>
							<h3>Cutoff Date</h3>
							<input type='date'/>
							<footer>
								<a href="#">Add Another Property</a>
								<button>Submit and Close</button>
							</footer>
						</form>
					</Rayon>
				</div>
				<div className='requestsWrapper'>
					<h2>Song Requests</h2>

				</div>
			</section>
			);
	},
	randomPW: function () {	
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890';
	let pass = '';
	for (let x = 0; x < 4; x++) {
    	let i = Math.floor(Math.random() * chars.length);
    	pass += chars.charAt(i);
	 	}
	return pass;
	},
	enterAttendee: function(e) {
		e.preventDefault();
		let newAttendee = {
			name: this.refs.name.value,
			accessCode: this.state.user.get('id')+'-'+this.randomPW(),
			party: 0,
			maxGuests: this.refs.max.value
		};
		Attendee.create(newAttendee);
		this.refs.name.value = '';
		this.refs.max.value = '';
	},
	openInviteModal: function() {
		this.setState({
			inviteModalVisible: true
		});
	},
	closeInviteModal: function() {
		this.setState({
			inviteModalVisible: false
		});
	},
	openHotelModal: function() {
		this.setState({
			hotelModalVisible: true
		});
	},
	closeHotelModal: function() {
		this.setState({
			hotelModalVisible: false
		});
	}
});