import React from 'react';
import Rsvp from './Subcomponents/RsvpList';
import Song from './Subcomponents/SongList';
import UserPlaceList from './Subcomponents/UserPlaceList';
import Attendees from '../../collections/AttendeeCollection';
import Locations from '../../collections/AccommodationCollection';
import Requests from '../../collections/RequestCollection';
import user from '../../stores/user';
import AddInvites from './AddInvites';
import AddHotel from './AddHotel';
import AddVenue from './AddVenue';

export default React.createClass({
	getInitialState: function() {
		return {
			user: user,
			Attendees: Attendees,
			Locations: Locations,
			Requests: Requests
		};
	},
	componentDidMount: function() {
		this.state.user.on('update', this.updateUser);
		Attendees.on('update', this.updateAttendees);
		Requests.on('update', this.updateRequests);
		Locations.on('update', this.updateLocations);
		Attendees.fetch({
			data: {
				where: {
					userId: this.state.user.get('id')
				}
			}
		});
		Requests.fetch({
			data: {
				where: {
					userId: this.state.user.get('id')
				}
			}
		});
		Locations.fetch({
			data: {
				where: {
					userId: user.get('id')
				}
			}
		});
	},
	// componentDidUnmount: function() {
	// 	this.state.user.off('update', this.updateUser);
	// 	Attendees.off('update', this.updateAttendees);
	// 	Requests.off('update', this.updateRequests);
	// 	Locations.off('update', this.updateLocations);
	// },
	updateUser: function() {
		this.setState({
			user: this.state.user
		});
	},
	updateAttendees: function() {
		this.setState({
			Attendees: Attendees
		});
	},
	updateRequests: function() {
		this.setState({
			Requests: Requests
		});
	},
	updateLocations: function() {
		this.setState({
			Locations: Locations
		});
	},
	render: function() {
		const places = this.state.Locations.models.map((place, i, array) => {
			return(
				<UserPlaceList 
				key = {place.get('id')}
				location = {place}
				name = {place.get('name')}
				website = {place.get('hotelUrl')}
				rate = {place.get('rate')}
				cutoffDate = {place.get('cutoffDate')}
				type = {place.get('locationType')}
				/>
			);
		});
		const requested = this.state.Requests.models.map((song, i, array) => {
			return(
				<Song 
				key = {song.get('id')}
				track = {song.get('trackId')}
				pic = {song.get('pic')}
				title = {song.get('title')}
				total = {song.get('requestCount')}
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
					<h2 className='attHeader' ><i>Attendees</i></h2>
					<div className='infoEditsWrapper'>
						<AddInvites />
						<AddHotel />
						<AddVenue />
					</div>
					<div className="container attTable">
						<div className="row tblRow tblHead">
							<div className='column tblColumn tblTitle nameHeader colName'>Name</div>
							<div className='column tblColumn tblTitle'>Access Code</div>
							<div className='column tblColumn tblTitle'># in Party</div>
							<div className='column tblColumn tblTitle'>RSVP Status</div>
						</div>
						{invited}
					</div>
				</div>
				<div className="rightSide">
					<div className='placesWrapper'>
						<h2 className="placeHeader"><i>Places Added</i></h2>
						<div className="placeBoxWrapper">
							{places}
						</div>
					</div>
					<div className='requestsWrapper'>
						<h2><i>Song Requests</i></h2>
						<div className="requested">
							{requested}
						</div>
					</div>
				</div>
			</section>
			);
	}
});