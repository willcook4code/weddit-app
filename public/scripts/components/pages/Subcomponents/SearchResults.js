import React from 'react';
import request from '../../../models/Request';
import Request from '../../../collections/RequestCollection';
import Rayon from 'rayon';

export default React.createClass({
	getInitialState: function() {
		return({
			Request: Request,
			request: new request(),
			confirmModalVisible: false
		});
	},
	componentDidMount: function() {
		Request.fetch({
			data: {
				where: {
					userId: this.props.userId
				}
			}
		});
		Request.on('update', this.updateRequest);
		this.state.request.on('change', this.updaterequest);
	},
	componentWillUnmount: function() {
		Request.off('update', this.updateRequest);
		this.state.request.off('change', this.updaterequest);
	},
	updateRequest: function() {
		this.setState({Request: Request});
	},
	updaterequest: function() {
		this.setState({request: request});
	},
	closeConfirmModal: function() {
		this.setState({
			confirmModalVisible: false
		});
	},
	render: function() {
		return (
			<div>
				<img src={this.props.pic}/>
				<p>{this.props.title}</p>
				<p>By: {this.props.band}</p>
				<p>{this.state.confirmReq}</p>
				<button onClick = {this.postRequest}>Request</button>
				<Rayon isOpen={this.state.confirmModalVisible} onClose={this.closeConfirmModal} bodyClass="rayon-no-overflow">
					<form>
						<h3>{this.props.title} has been added to the request list.</h3>
					</form>
				</Rayon>
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
		this.state.request.set(newRequest);
		let trackIds = Request.pluck('trackId');
		let existingTracks = [];
		// let counter = this.state.request.get('requestCount');
		trackIds.forEach((track, i, array) => {
			if (this.state.request.get('trackId') === track) {
				existingTracks.push(this.state.request);
		}});
		if (existingTracks.length <= 0) {
			Request.create(newRequest);
		}
		// if (existingTracks.length >=1) {
		// 	let counter = this.state.request.get('requestCount');
		// 	this.state.request.save({
		// 		requestCount: counter++
		// 	});
		// }
		this.setState({
			confirmModalVisible: true
		});
	}
});