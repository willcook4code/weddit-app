import React from 'react';
import Rsvp from './Subcomponents/RsvpList';
import Song from './Subcomponents/SongList';
import Attendees from '../../collections/AttendeeCollection';
import user from '../../stores/user';
import AddInvites from './AddInvites';
import AddHotel from './AddHotel';
import AddVenue from './AddVenue';
import Requests from '../../collections/RequestCollection';

export default React.createClass({
	getInitialState: function() {
		return {
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
				accessCode = {invitee.get('accessCode')}
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
						<span>Access Code</span>
						<span># in Party</span>
						<span>Going?</span>
					</header>
					{invited}
				</div>
				<div className='infoEditsWrapper'>
					<AddInvites />
					<AddHotel />
					<AddVenue />
				</div>
				<div className='requestsWrapper'>
					<h2>Song Requests</h2>
					{requested}
				</div>
			</section>
			);
	}
});