import React from 'react';
import Rayon from 'rayon';
import Locations from '../../collections/AccommodationCollection';
import HotelDisplay from './Subcomponents/HotelList';
import VenueDisplay from './Subcomponents/VenueMap';
import SongSearch from './SongSearch';

export default React.createClass({
	getInitialState: function() {
		return {
			infoModalVisible: true,
			Locations: Locations,
			venName: '',
			venZip: ''
		};
	},
	componentWillMount: function() {
		Locations.on('update', () => {
			this.setState({
				Locations: Locations
			});
		});
		Locations.on('update', () => {
			this.setState({
				venName: Locations.findWhere({locationType: 'venue'}).get('name'),
				venZip: Locations.findWhere({locationType: 'venue'}).get('zip')
			});
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
				rate = {hotel.get('rate')}
				/>
				);
		});
		return(
			<section className='attendeesPage'>
				<Rayon isOpen={this.state.infoModalVisible} onClose={this.closeInfoModal}>
					<form>
						<h3>Please Enter Your Access Code</h3>
						<input type='text' ref='accessCode'/>
						<button onClick={this.access}>Enter</button>
					</form>
				</Rayon>
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
				<SongSearch />
			</section>
			);
	},
	access: function(e) {
		e.preventDefault();
		Locations.fetch({
			data: {
				where: {
					userId: parseFloat(this.refs.accessCode.value.charAt(0))
				}
			}
		});
		this.setState({
            infoModalVisible: false
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
    }
});

