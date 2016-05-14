import React from 'react';

export default React.createClass({
	render: function() {
		let rsvp = 'N/A';
		if (this.props.isGoing === false) {
			rsvp = 'No';
		} else if (this.props.isGoing === true) {
			rsvp = 'Yes';
		}
		return(
			<div className="row tblRow">
			    <div className="column tblColumn tblEntry colName colName">{this.props.name}</div>
				<div className="column tblColumn tblEntry centerAlign">{this.props.accessCode}</div>
				<div className="column tblColumn tblEntry centerAlign">{this.props.party}</div>
				<div className="column tblColumn tblEntry centerAlign">{rsvp}</div>
			</div>
			);
	}
});