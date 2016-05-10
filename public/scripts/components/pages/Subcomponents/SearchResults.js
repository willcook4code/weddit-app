import React from 'react';
import Request from '../../../collections/RequestCollection';

export default React.createClass({
	render: function() {
		return (
			<div>
				<img src={this.props.pic}/>
				<p>{this.props.title}</p>
				<p>By: {this.props.band}</p>
				<button onClick = {this.postRequest}>Request</button>
			</div>
			);
	},
	postRequest: function() {
		let newRequest = {
			trackId: this.props.trackId,
			pic: this.props.pic,
			title: this.props.title,
			band: this.props.band,
			userId: this.props.userId
		};
		Request.create(newRequest);
	}
});