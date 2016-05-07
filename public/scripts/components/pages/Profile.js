import React from 'react';
import Rsvp from './Subcomponents/RsvpList';
import Rayon from 'rayon';
import Attendees from '../../collections/AttendeeCollection';
import Hotel from '../../collections/AccommodationCollection';
import user from '../../models/user';

export default React.createClass({
	getInitialState: function() {
		return {
			inviteModalVisible: false,
			hotelModalVisible: false,
			user: user,
			Attendees: Attendees
		};
	},
	componentDidMount: function() {
		this.state.user.on('update', () => {
			this.setState({
				user: user
			});
		});
		Attendees.on('update', () => {
			this.setState({
				Attendees: Attendees
			});
		});
		Attendees.fetch({
			data: {
				where: {
					userId: this.state.user.get('id')
				}
			}
		});
		console.log(this.state.user.get('id'));
	},
	render: function() {
		console.log('render');
		console.log(this.state.Attendees.models);
		console.log(this.state.user.get('id'));
		const invited = this.state.Attendees.models.map((invitee, i, array) => {
			return(
				<Rsvp 
				key = {invitee.get('id')}
				name = {invitee.get('name')}
				party = {invitee.get('party')}
				isGoing = {invitee.get('isGoing')}
				/>
				);
		});
		return(
			<section className='profilePage'>
				<div className='attendeesWrapper'>
					<h2>Attendees</h2>
					<header className='rsvpHeader'>
						<span>Name</span>
						<span># in Party</span>
						<span>Going?</span>
					</header>
					{invited}
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
								<a href="#" onClick={this.enterAttendee}>Add Party</a>
								<button type='button' onClick={this.closeInviteModal}>Close</button>
							</footer>
						</form>
					</Rayon>
					<button onClick={this.openHotelModal}>Add Hotel</button>
					<Rayon isOpen={this.state.hotelModalVisible} onClose={this.closeHotelModal}>
						<form>
							<p>Add Hotel Form</p>
							<h3>Property Name</h3>
							<input type='text' placeholder='eg: Sheraton' ref='hotelName'/>
							<h3>Zip Code</h3>
							<input type='text' placeholder='eg: 78701' ref='hotelZip'/>
							<h3>Website</h3>
							<input type='text' placeholder='eg: www.sheraton.com' ref='hotelUrl'/>
							<h3>Rate</h3>
							<input type='text' placeholder='eg: $99' ref='rate'/>
							<h3>Cutoff Date</h3>
							<input type='date'/>
							<footer>
								<a href="#" onClick={this.addHotel}>Add Property</a>
								<button type='button' onClick={this.closeHotelModal}>Close</button>
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
	let code = '';
	for (let x = 0; x < 4; x++) {
    	let i = Math.floor(Math.random() * chars.length);
    	code += chars.charAt(i);
	 	}
	return code;
	},
	addHotel: function(e) {
		e.preventDefault();
		let newHotel = {
			hotelName: this.refs.hotelName.value,
			hotelZip: this.refs.hotelZip.value,
			hotelUrl: this.refs.hotelUrl.value,
			rate: this.refs.rate.value
		};
		Hotel.create(newHotel);
		this.refs.hotelName.value = '';
		this.refs.hotelZip.value = '';
		this.refs.hotelUrl.value = '';
		this.refs.rate.value = '';
	},
	enterAttendee: function(e) {
		e.preventDefault();
		let newAttendee = {
			name: this.refs.name.value,
			accessCode: this.state.user.get('id')+'-'+this.randomPW(),
			party: 0,
			maxGuests: this.refs.max.value
		};
		Attendees.create(newAttendee);
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