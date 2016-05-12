import React from 'react';
import Rayon from 'rayon';
import user from '../../stores/user';
import Location from '../../collections/AccommodationCollection';

export default React.createClass({
	getInitialState: function() {
		return {
			hotelModalVisible: false,
			user: user,
			addedMsg: null
		};
	},
	componentDidMount: function() {
		this.state.user.on('add', () => {
			this.setState({
				user: user
			});
		});
	},
	addHotel: function(e) {
		e.preventDefault();
		let newHotel = {
			name: this.refs.hotelName.value,
			zip: this.refs.hotelZip.value,
			hotelUrl: this.refs.hotelUrl.value,
			rate: this.refs.rate.value,
			cutoffDate: this.refs.cutoff.value,
			locationType: 'hotel'
		};
		console.log(newHotel);
		Location.create(newHotel);
		this.setState({
			addedMsg: this.refs.hotelName.value+' was added at the rate of '+this.refs.rate.value+'.'
		});
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
	},
	render: function() {
		return (
			<div>
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
							<input type='date' ref='cutoff'/>
							<p>{this.state.addedMsg}</p>
							<footer>
								<a href="#" onClick={this.addHotel}>Add Property</a>
								<button type='button' onClick={this.closeHotelModal}>Close</button>
							</footer>
						</form>
					</Rayon>
			</div>
			);
	}
});