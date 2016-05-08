import React from 'react';

export default React.createClass({
	render: function() {
		let rsvp = 'unknown';
		if (this.props.isGoing === false) {
			rsvp = 'no';
		} else if (this.props.isGoing === true) {
			rsvp = 'yes';
		}
		return(
			<div className='rsvpWrapper'>
				<div>
					<p>{this.props.name}</p>
					<p>{this.props.accessCode}</p>
					<p>{this.props.party}</p>
					<p>{rsvp}</p>
				</div>
			</div>
			);
	}
});