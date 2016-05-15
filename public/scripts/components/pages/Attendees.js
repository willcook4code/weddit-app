import React from 'react';
import Locations from '../../collections/AccommodationCollection';
import Bio from '../../collections/BioCollection';
import HotelDisplay from './Subcomponents/HotelList';
import VenueDisplay from './Subcomponents/VenueMap';
import LocationsDisplay from './Subcomponents/NearbyMaps';
import SongSearch from './SongSearch';
import user from '../../stores/user';
import attendee from '../../stores/attendee';
import {browserHistory} from 'react-router';

export default React.createClass({
	getInitialState: function() {
		return {
			user: user,
			attendee: attendee,
			Locations: Locations,
			Bio: Bio,
			searchType: ['Restaurants', 'Attractions'],
			areaZip: '',
			updateMsg: ''
		};
	},
	componentWillMount: function() {
		this.state.attendee.on('change', this.changeAttendee);
		this.state.user.on('change', this.changeUser);
		Locations.on('update', this.updateAreaZip);
		Bio.on('update', this.updateBio);
		if (attendee.get('userId')) {
			Locations.fetch({
				data: {
					where: {
						userId: attendee.get('userId')
					}
				}
			});
			Bio.fetch({
				data: {
					where: {
						userId: attendee.get('userId')
					}
				}
			});
		} else if (user.get('id')) {
			Locations.fetch({
				data: {
					where: {
						userId: user.get('id')
					}
				}
			});
			Bio.fetch({
				data: {
					where: {
						userId: user.get('id')
					}
				}
			});
		} else {
			browserHistory.push('/');
		}
	},
	componentWillUnmount: function () {
		this.state.attendee.off('change', this.changeAttendee);
		this.state.user.off('change', this.changeUser);
		Locations.off('update', this.updateAreaZip);
	},
	updateAreaZip: function () {
		this.setState({
			areaZip: Locations.findWhere({locationType: 'Venue'}).get('zip')
		});
	},
	changeUser: function() {
		this.setState({
			user: user
		});
	},
	changeAttendee: function () {
		this.setState({
			attendee: attendee
		});
	},
	updateBio: function () {
		this.setState({
			Bio: this.state.Bio.models
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
    updateAtt: function(e) {
    	e.preventDefault();
		this.state.attendee.save({
			party: this.refs.party.value
		});
		this.setState({
			updateMsg: 'Your party has been updated to a total of '+this.refs.party.value+'.'
		});
    },
	render: function() {
		let updateRsvp = null;
		if (this.state.attendee.get('isGoing')) {
			updateRsvp = (
				<div className='updateRsvp'>
					<h3>Update RSVP</h3>
					<p>Number Attending</p>
					<input type='number' min='0' max={this.state.attendee.get('maxGuests')} ref='party'/>
					<p>{this.state.updateMsg}</p>
					<button onClick={this.updateAtt}>Submit</button>
				</div>
				);
		}
		const listedHotels = this.state.Locations.models.filter((location, i, array) => {
			if (location.get('locationType') === 'Hotel') {
				return true;
			} else {
				return false;
			}
		}).map((hotel, i, array) => {
			return (
				<HotelDisplay 
				key = {hotel.get('id')}
				name = {hotel.get('name')}
				zip = {hotel.get('zip')}
				hotelUrl = {hotel.get('hotelUrl')}
				cutoffDate = {hotel.get('cutoffDate')}
				rate = {hotel.get('rate')}
				/>
				);
		});
		const listedVenue = this.state.Locations.models.filter((location, i, array) => {
			if (location.get('locationType') === 'Venue') {
				return true;
			} else {
				return false;
			}
		}).map((venue, i, array) => {
			return (
				<VenueDisplay
				key = {venue.get('id')}
				venName = {venue.get('name')}
				venZip = {venue.get('zip')}
				/>
			);
		});
		const eachSearch = this.state.searchType.map((type, i, array) => {
			return (
				<LocationsDisplay
				key = {i}
				searchType = {type}
				areaZip = {this.state.areaZip}
				/>
			);
		});
		const info = this.state.Bio.map((entry, i, array) => {
			return (
				<div key={entry.get('id')} className="bioContainer">
					<h2>Greetings from {entry.get('registrant1')} & {entry.get('registrant2')}!</h2>
					<img src={entry.get('pic')}/>
					<h3>Our Story</h3>
					<p>{entry.get('story')}</p>
				</div>
			);
		});
		return(
			<section className='attendeesPage'>
					
				<div className="mapContainer">
					{info}
					<div className='hotelDisplay mapDisplay'>
						<h2 className="mapTitle"><i>Hotels</i></h2>
						{listedHotels}
					</div>
					<div className='venueDisplay mapDisplay btmMaps'>
						<h2 className="mapTitle btmTitle"><i>Venue(s)</i></h2>
						{listedVenue}
					</div>
					<div className='wideSearchDisplay mapDisplay btmMaps'>
						{eachSearch}
					</div>
				</div>
				<div className="attActionContainer">
					{updateRsvp}
					<SongSearch 
					userId = {this.state.attendee.get('userId')}
					/>
				</div>
			</section>
			);
	}
});