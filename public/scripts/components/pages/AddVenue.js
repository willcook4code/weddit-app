import React from 'react';
import Rayon from 'rayon';
import user from '../../stores/user';
import Location from '../../collections/AccommodationCollection';

export default React.createClass({
	getInitialState: function() {
		return {
			venueModalVisible: false,
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
	addVenue: function(e) {
		e.preventDefault();
		let newVenue = {
			name: this.refs.name.value,
			zip: this.refs.zip.value,
			locationType: 'Venue'
		};
		Location.create(newVenue);
		this.setState({
			addedMsg: this.refs.name.value+' was added as a venue.'
		});
		this.refs.name.value = '';
		this.refs.zip.value = '';
	},
	openVenueModal: function() {
		this.setState({
			venueModalVisible: true
		});
	},
	closeVenueModal: function() {
		this.setState({
			venueModalVisible: false
		});
	},
	render: function() {
		return (
			<div>
				<button onClick={this.openVenueModal} className="addListingBtn">Add Venue</button>
					<Rayon isOpen={this.state.venueModalVisible} onClose={this.closeVenueModal} bodyClass="rayon-no-overflow">
						<form>
							<p>Add Venue Form</p>
							<h3>Venue Name</h3>
							<input type='text' placeholder='eg: Some Hall' ref='name'/>
							<h3>Zip Code</h3>
							<input type='text' placeholder='eg: 78701' ref='zip'/>
							<p>{this.state.addedMsg}</p>
							<footer>
								<a href="#" onClick={this.addVenue}>Add Venue</a>
								<button type='button' onClick={this.closeVenueModal}>Close</button>
							</footer>
						</form>
					</Rayon>
			</div>
			);
	}
});