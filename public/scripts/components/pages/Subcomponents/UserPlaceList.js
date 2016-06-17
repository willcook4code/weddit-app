import React from 'react';
import moment from 'moment';

export default React.createClass({
	render: function() {
		let website = null;
		if (this.props.website) {
			website = 'Website';
		}
		let date = null;
		if (moment(this.props.cutoffDate).format('MMM Do YYYY') === 'Invalid date') {
			date = null;
		} else {
			date = 'Cutoff: '+moment(this.props.cutoffDate).format('MMM Do YYYY');
		}
		let url = null;
		if (this.props.website.indexOf('http://') === -1) {
			url = 'http://'+this.props.website;
		} else {
			url = this.props.website;
		}
		return(
			<div className="placeBox">
				<h4 className="placeType">{this.props.type}</h4>
				<span className="placeName placeInfo">{this.props.name}</span>
				<a href={url} target='_blank' className="placeUrl placeInfo smlInfo">{website}</a>
				<span className="placePhone placeInfo smlInfo">{this.props.phoneNumber}</span>
				<span className="placeRate placeInfo smlInfo">{this.props.rate}</span>
				<span className="cutoffDate placeInfo smlInfo">{date}</span>
				<button className="placeBtn" onClick={this.deletePlace}>Remove</button>
			</div>
		);
	},
	deletePlace: function() {
		this.props.location.destroy();
	}
});