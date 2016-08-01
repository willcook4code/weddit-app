import React from 'react';

export default React.createClass({
	render: function() {
		let classes = 'row tblRow rsvpList NA';
		let rsvp = 'N/A';
		if (this.props.isGoing === false) {
			rsvp = 'No';
			classes = 'row tblRow rsvpList No';
		} else if (this.props.isGoing === true) {
			rsvp = 'Yes';
			classes = 'row tblRow rsvpList Yes';
		}
		return(
			<div className={classes} data-rsvp-status={rsvp}>
			    <div className="column tblColumn tblEntry colName colName">{this.props.name}</div>
				<div className="column tblColumn tblEntry centerAlign">{this.props.accessCode}</div>
				<div className="column tblColumn tblEntry centerAlign">{this.props.party} of {this.props.maxGuests}</div>
				<div className="column tblColumn tblEntry centerAlign">{rsvp}</div>
			</div>
			);
	}
});