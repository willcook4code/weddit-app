import React from 'react';
import Locations from '../../collections/AccommodationCollection';
import HotelDisplay from './Subcomponents/HotelList';
import VenueDisplay from './Subcomponents/VenueMap';
import SongSearch from './SongSearch';
import attendee from '../../stores/attendee';
import {browserHistory} from 'react-router';

export default React.createClass({
	getInitialState: function() {
		return {
			attendee: attendee,
			Locations: Locations,
			venName: '',
			venZip: ''
		};
	},
	componentWillMount: function() {
		this.state.attendee.on('change', () => {
			this.setState({
				attendee: attendee
			});
		});
		Locations.on('update', () => {
			this.setState({
				venName: Locations.findWhere({locationType: 'venue'}).get('name'),
				venZip: Locations.findWhere({locationType: 'venue'}).get('zip')
			});
		});
		if (attendee.get('userId')) {
			Locations.fetch({
				data: {
					where: {
						userId: attendee.get('userId')
					}
				}
			});
		} else {
			browserHistory.push('/');
		}
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
				rate = {hotel.get('rate')}
				/>
				);
		});
		return(
			<section className='attendeesPage'>
				<div className='hotelDisplay'>
					<h2>Hotels</h2>
					{listedHotels}
				</div>
				<div className='wideSearchDisplay'>
					<h2>Venue</h2>
					<VenueDisplay
					venName = {this.state.venName}
					venZip = {this.state.venZip}
					/>
				</div>
				<SongSearch 
				userId = {this.state.attendee.get('userId')}
				/>
			</section>
			);
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
    }
});