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
import AddHoneyfund from './addHoneyFund';
import AddHotel from './AddHotel';
import AddVenue from './AddVenue';
import AddBio from './AddBio';
import AddRegistry from './AddRegistry';
import Bio from '../../collections/BioCollection';
import bio from '../../stores/bio';
import Scrapbook from '../../collections/ScrapbookCollection';
import PhotoGrid from './Subcomponents/PhotoGrid';
import $ from 'jquery';

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
		Scrapbook.on('update change', this.updateScrapbook);
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
		Scrapbook.fetch({
			data: {
				where: {userId: user.get('id')}
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
		Scrapbook.off('update change', this.updateScrapbook);
	},
	updateScrapbook: function() {
		this.setState({
			Scrapbook: Scrapbook.sort(Scrapbook.comparator = 'id')
		});
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
			Attendees: Attendees.sort(Attendees.comparator = 'name')
		});
	},
	updateRequests: function() {
		this.setState({
			Requests: Requests.sort()
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
	// seeGoing: function () {
	// 	$('.rsvpList').not($('.rsvpList:contains(\'Yes\')')).detach();
	// 	if (!'.rsvpList'.length) {
	// 		$('.tblHead').append('<h2>No invites match the criteria</h2>').css('text-align', 'center');
	// 	}
	// },
	// seeRegrets: function () {
	// 	$('.rsvpList').not($('.rsvpList:contains(\'No\')')).detach();
	// 	if (!$('.rsvpList').length) {
	// 		$('.tblHead').append('<h2>No invites match the criteria</h2>').css('text-align', 'center');
	// 	}
	// },
	render: function() {
		const eachImage = Scrapbook.models.map((photo, i, array) => {
			return (
				<PhotoGrid
				key = {i}
				name = {photo.get('name')}
				pic = {photo.get('pic')}
				caption = {photo.get('caption')}
				inSlideshow = {photo.get('inSlideshow')}
				thisPhoto = {photo}
				/>
			);
		});
		const places = this.state.Locations.models.map((place, i, array) => {
			return(
				<UserPlaceList 
				key = {i}
				location = {place}
				name = {place.get('name')}
				website = {place.get('hotelUrl')}
				phoneNumber = {place.get('phoneNumber')}
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
		let start = 0;
		const totals = this.state.Attendees.models.map((invitee, i, array) => {
			start = start + invitee.get('party');
			if (i === (this.state.Attendees.models.length - 1)) {
				return start;
			}
		});
		let begin = 0;
		const totalInvited = this.state.Attendees.models.map((invitee, j, array) => {
			begin = begin + Number(invitee.get('maxGuests'));
			if (j === (array.length - 1)) {
				return begin;
			}
		});
		const invited = this.state.Attendees.models.map((invitee, i, array) => {
			return(
				<Rsvp 
				key = {i}
				name = {invitee.get('name')}
				accessCode = {invitee.get('accessCode')}
				party = {invitee.get('party')}
				isGoing = {invitee.get('isGoing')}
				maxGuests = {invitee.get('maxGuests')}
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
						<AddRegistry />
						<AddHoneyfund />
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
						<h3 className="totals">Of the {totalInvited} people invited, {totals} plan to attend.</h3>
					</div>
					<div>
						<Link className="navLinks pageLink slideshowBtn" to="/slideshow">Go To Slideshow</Link>
						<div className="photoBucket">
							{eachImage}
						</div>
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