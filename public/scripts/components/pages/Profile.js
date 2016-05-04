import React from 'react';
import Rsvp from './Subcomponents/RsvpList';

export default React.createClass({
	render: function() {
		return(
			<section className='profilePage'>
				<div className='attendeesWrapper'>
					<h2>Attendees</h2>
					<Rsvp/>
				</div>
				<div className='infoEditsWrapper'>
					<button>Add Invites</button>
					<button>Add Hotel</button>
				</div>
				<div className='requestsWrapper'>
					<h2>Song Requests</h2>

				</div>
			</section>
			);
	}
});