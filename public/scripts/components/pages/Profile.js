import React from 'react';
import {Link} from 'react-router';
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
import AddBio from './AddBio';
import Bio from '../../collections/BioCollection';
import bio from '../../stores/bio';

export default React.createClass({
	getInitialState: function() {
		return {
			user: user,
			Attendees: Attendees,
			Locations: Locations,
			Requests: Requests,
			Bio: Bio,
			bio: bio
		};
	},
	componentWillMount: function() {
		this.state.user.on('update change', this.updateUser);
		bio.on('update change', this.updateBio);
		Attendees.on('update', this.updateAttendees);
		Requests.on('update', this.updateRequests);
		Locations.on('update', this.updateLocations);
		Bio.on('update change', this.updateBioCol);
		Bio.fetch({
			data: {
				where: {
					userId: this.state.user.get('id')
				}
			}
		});
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
	componentWillUnmount: function() {
		this.state.user.off('update change', this.updateUser);
		Attendees.off('update', this.updateAttendees);
		Requests.off('update', this.updateRequests);
		Locations.off('update', this.updateLocations);
		bio.off('update change', this.updateBio);
		Bio.off('update change', this.updateBioCol);
	},
	updateUser: function() {
		this.setState({
			user: this.state.user
		});
	},
	updateBio: function() {
		this.setState({
			bio: Bio.models
		});
	},
	updateBioCol: function() {
		this.setState({
			Bio: Bio
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
	handleFilestack: function(e) {
		e.preventDefault();
 		filepicker.pick({
		    	conversions: ['crop', 'rotate'],
				cropRatio: 1,
				cropForce: true,
		    	services: ['COMPUTER', 'CONVERT', 'FACEBOOK'],
		    	mimetype: 'image/*'
		   	},
		   	(Blob) => {
		     	if (Bio.length) {
					Bio.at(0).save({
			     		pic: Blob.url,
			     		userId: this.state.user.get('id')
			     	});
			    } else {
			    	Bio.create({
			     		pic: Blob.url,
			     		userId: this.state.user.get('id')
			     	});
			    }
		   	}
		);
	},
	render: function() {
		const places = this.state.Locations.models.map((place, i, array) => {
			return(
				<UserPlaceList 
				key = {i}
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
				key = {i}
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
				key = {i}
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
						<button className="addListingBtn" onClick={this.handleFilestack}>Choose Profile Photo</button>
						<AddBio />
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
					<div>
						<Link className="navLinks pageLink" to="/slideshow">Slideshow</Link>
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