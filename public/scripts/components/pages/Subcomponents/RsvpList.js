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
			<tr>
			    <td>{this.props.name}</td>
				<td className="leftAlign">{this.props.accessCode}</td>
				<td className="leftAlign">{this.props.party}</td>
				<td className="leftAlign">{rsvp}</td>
			</tr>
			);
	}
});