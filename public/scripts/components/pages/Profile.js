import React from 'react';
import Rsvp from './Subcomponents/RsvpList';
import Song from './Subcomponents/SongList';
import Rayon from 'rayon';
import Attendees from '../../collections/AttendeeCollection';
import Hotel from '../../collections/AccommodationCollection';
import user from '../../models/user';
import AddInvites from './AddInvites';
import Requests from '../../collections/RequestCollection';

export default React.createClass({
	getInitialState: function() {
		return {
			hotelModalVisible: false,
			user: user,
			Attendees: Attendees,
			Requests: Requests
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
		Requests.on('update', () => {
			this.setState({
				Requests: Requests
			});
		});
		Requests.fetch({
			data: {
				where: {
					userId: this.state.user.get('id')
				}
			}
		});
	},
	render: function() {
		const requested = this.state.Requests.models.map((song, i, array) => {
			return(
				<Song 
				key = {song.get('id')}
				pic = {song.get('pic')}
				title = {song.get('title')}
				band = {song.get('band')}
				/>
				);
		});
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
					<AddInvites />
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
					{requested}
				</div>
			</section>
			);
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