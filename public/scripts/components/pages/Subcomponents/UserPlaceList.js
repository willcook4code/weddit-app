import React from 'react';
import moment from 'moment';

export default React.createClass({
	render: function() {
		let date = null;
		if (moment(this.props.cutoffDate).format('MMM Do YYYY') === 'Invalid date') {
			date = null;
		} else {
			date = 'Booking cutoff: '+moment(this.props.cutoffDate).format('MMM Do YYYY');
		}
		let url = null;
		if (this.props.website.indexOf('http://') === -1) {
			url = 'http://'+this.props.website;
		} else {
			url = this.props.website;
		}
		return(
			<div className="placeBox">
				<span className="placeName">{this.props.name} - </span>
				<span className="placeType">{this.props.type}</span>
				<a href={url} target='_blank' className="placeUrl">Website</a>
				<span className="placeRate">{this.props.rate}</span>
				<span className="cutoffDate">{date}</span>
				<button onClick={this.deletePlace}>Remove</button>
			</div>
		);
	},
	deletePlace: function() {
		this.props.location.destroy();
	}
});