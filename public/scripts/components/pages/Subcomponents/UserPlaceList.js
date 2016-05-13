import React from 'react';
import moment from 'moment';

export default React.createClass({
	render: function() {
		let date = null;
		if (moment(this.props.cutoffDate).format('MMM Do YYYY') === 'Invalid date') {
			date = null;
		} else {
			date = moment(this.props.cutoffDate).format('MMM Do YYYY');
		}
		let url = null;
		if (this.props.website.indexOf('http://') === -1) {
			url = 'http://'+this.props.website;
		} else {
			url = this.props.website;
		}
		return(
			<div>
				<p>{this.props.name}</p>
				<a href={url} target='_blank'>Website</a>
				<p>{this.props.rate}</p>
				<p>{date}</p>
				<p>{this.props.type}</p>
				<button onClick={this.deletePlace}>Remove</button>
			</div>
		);
	},
	deletePlace: function() {
		this.props.location.destroy();
	}
});