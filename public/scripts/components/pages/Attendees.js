import React from 'react';
import Locations from '../../collections/AccommodationCollection';
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
			searchType: ['Restaurants', 'Attractions'],
			areaZip: '',
			updateMsg: ''
		};
	},
	componentWillMount: function() {
		this.state.attendee.on('change', this.changeAttendee);
		this.state.user.on('change', this.changeUser);
		Locations.on('update', this.updateAreaZip);
		if (attendee.get('userId')) {
			Locations.fetch({
				data: {
					where: {
						userId: attendee.get('userId')
					}
				}
			});
			// User.fetch({
			// 	data: {
			// 		where: {
			// 			id: attendee.get('userId')
			// 		}
			// 	}
			// });
		} else if (user.get('id')) {
			Locations.fetch({
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
			areaZip: Locations.findWhere({locationType: 'venue'}).get('zip')
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
		const listedHotels = this.state.Locations.models.filter((location, i, array) => {
			if (location.get('locationType') === 'hotel') {
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
			if (location.get('locationType') === 'venue') {
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
		return(
			<section className='attendeesPage'>
				<div className='hotelDisplay'>
					<h2>Hotels</h2>
					{listedHotels}
				</div>
				<div className='venueDisplay'>
					<h2>Venue(s)</h2>
					{listedVenue}
				</div>
				<div className='wideSearchDisplay'>
					{eachSearch}
				</div>
				<div className='whenVerified'>
					<h3>Update RSVP</h3>
					<p>Number Attending</p>
					<input type='number' min='0' max={this.state.attendee.get('maxGuests')} ref='party'/>
					<p>{this.state.updateMsg}</p>
					<button onClick={this.updateAtt}>Submit</button>
				</div>
				<SongSearch 
				userId = {this.state.attendee.get('userId')}
				/>
			</section>
			);
	}
});