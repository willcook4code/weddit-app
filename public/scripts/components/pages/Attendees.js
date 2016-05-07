import React from 'react';
import Rayon from 'rayon';
import Hotels from '../../collections/AccommodationCollection';
import HotelDisplay from './Subcomponents/HotelList';
import SongSearch from './SongSearch';

export default React.createClass({
	getInitialState: function() {
		return {
			infoModalVisible: true,
			Hotels: Hotels
		};
	},
	componentDidMount: function() {
		Hotels.on('update', () => {
			this.setState({
				Hotels: Hotels
			});
		});
	},
	render: function() {
		const listed = this.state.Hotels.models.map((hotel, i, array) => {
			return (
				<HotelDisplay 
				key = {hotel.get('id')}
				hotelName = {hotel.get('hotelName')}
				hotelZip = {hotel.get('hotelZip')}
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
					{listed}
				</div>
				<div className='wideSearchDisplay'>
					<h2>Other Hotels</h2>
					
				</div>
				<SongSearch />
			</section>
			);
	},
	access: function(e) {
		e.preventDefault();
		Hotels.fetch({
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

