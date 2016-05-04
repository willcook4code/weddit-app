import React from 'react';
import Rsvp from './Subcomponents/RsvpList';
import Rayon from 'rayon';

export default React.createClass({
	getInitialState: function() {
		return {
			inviteModalVisible: false,
			hotelModalVisible: false
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
						<section>Invites Form</section>
						<footer>
							<button onClick={this.closeInviteModal}>Close</button>
						</footer>
					</Rayon>
					<button onClick={this.openHotelModal}>Add Hotel</button>
					<Rayon isOpen={this.state.hotelModalVisible} onClose={this.closeHotelModal}>
						<section>Add Hotel Form</section>
						<footer>
							<button onClick={this.closeHotelModal}>Close</button>
						</footer>
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