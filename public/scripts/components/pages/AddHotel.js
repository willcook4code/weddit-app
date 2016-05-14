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
	// componentDidUnmount: function() {
	// 	this.state.user.off('add', () => {
	// 		this.setState({
	// 			user: user
	// 		});
	// 	});
	// },
	addHotel: function(e) {
		e.preventDefault();
		let newHotel = {
			name: this.refs.hotelName.value,
			zip: this.refs.hotelZip.value,
			hotelUrl: this.refs.hotelUrl.value,
			rate: this.refs.rate.value,
			cutoffDate: this.refs.cutoff.value,
			locationType: 'Hotel'
		};
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
				<button onClick={this.openHotelModal} className="addListingBtn">Add Hotel</button>
					<Rayon isOpen={this.state.hotelModalVisible} onClose={this.closeHotelModal} bodyClass="rayon-no-overflow">
						<form className="addMod">
							<h3 className="formPrompt">Property Name</h3>
							<input className="modalInput" type='text' placeholder='eg: Sheraton' ref='hotelName'/>
							<h3 className="formPrompt">Zip Code</h3>
							<input className="modalInput" type='text' placeholder='eg: 78701' ref='hotelZip'/>
							<h3 className="formPrompt">Website</h3>
							<input className="modalInput" type='text' placeholder='eg: www.sheraton.com' ref='hotelUrl'/>
							<h3 className="formPrompt">Rate</h3>
							<input className="modalInput" type='text' placeholder='eg: $99' ref='rate'/>
							<h3 className="formPrompt">Rate Cutoff Date</h3>
							<input className="modalInput" type='date' ref='cutoff'/>
							<p>{this.state.addedMsg}</p>
							<footer>
								<a className="submitAdd" href="#" onClick={this.addHotel}>Add Property</a>
								<button type='button' onClick={this.closeHotelModal}>Close</button>
							</footer>
						</form>
					</Rayon>
			</div>
			);
	}
});