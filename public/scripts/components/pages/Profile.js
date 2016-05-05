import React from 'react';
import Rsvp from './Subcomponents/RsvpList';
import Rayon from 'rayon';

export default React.createClass({
	getInitialState: function() {
		return {
			inviteModalVisible: false,
			hotelModalVisible: false,
		};
	},
	render: function() {
		return(
			<section className='profilePage'>
				<div className='attendeesWrapper'>
					<h2>Attendees</h2>
					<Rsvp/>
				</div>
				<div className='infoEditsWrapper'>
					<button onClick={this.openInviteModal}>Add Invites</button>
					<Rayon isOpen={this.state.inviteModalVisible} onClose={this.closeInviteModal}>
						<form onSubmit={this.closeInviteModal}>
							<p>Invites Form</p>
							<h3>Primary Name</h3>
							<input type='text' placeholder='eg: Sam Smith'/>
							<h3>Maximum Number of Guests</h3>
							<input type='text' placeholder='eg: 4'/>
							<footer>
								<a href="#">Add Another Party</a>
								<button>Submit and Close</button>
							</footer>
						</form>
					</Rayon>
					<button onClick={this.openHotelModal}>Add Hotel</button>
					<Rayon isOpen={this.state.hotelModalVisible} onClose={this.closeHotelModal}>
						<form onSubmit={this.closeHotelModal}>
							<p>Add Hotel Form</p>
							<h3>Property Name</h3>
							<input type='text' placeholder='eg: Sheraton'/>
							<h3>Zip Code</h3>
							<input type='text' placeholder='eg: 78701'/>
							<h3>Website</h3>
							<input type='text' placeholder='eg: www.sheraton.com'/>
							<h3>Rate</h3>
							<input type='text' placeholder='eg: $99'/>
							<h3>Cutoff Date</h3>
							<input type='date'/>
							<footer>
								<a href="#">Add Another Property</a>
								<button>Submit and Close</button>
							</footer>
						</form>
					</Rayon>
				</div>
				<div className='requestsWrapper'>
					<h2>Song Requests</h2>

				</div>
			</section>
			);
	},
	openInviteModal: function() {
		this.setState({
			inviteModalVisible: true
		});
	},
	closeInviteModal: function() {
		this.setState({
			inviteModalVisible: false
		});
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
	}
});