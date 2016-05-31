import React from 'react';
import request from '../../../models/Request';
import Request from '../../../collections/RequestCollection';
import Rayon from 'rayon';
import user from '../../../stores/user';

export default React.createClass({
	getInitialState: function() {
		return({
			Request: Request,
			request: new request(),
			user: user,
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
		this.state.user.on('update change', this.updateUser);
		Request.on('change', this.updateRequest);
		this.state.request.on('add update change', this.updaterequest);
	},
	componentWillUnmount: function() {
		Request.off('change', this.updateRequest);
		this.state.user.off('update change', this.updateUser);
		this.state.request.off('add update change', this.updaterequest);
	},
	updateRequest: function() {
		this.setState({Request: Request});
	},
	updateUser: function() {
		this.setState({user: user});
	},
	updaterequest: function() {
		this.setState({request: new request()});
	},
	closeConfirmModal: function() {
		this.setState({
			confirmModalVisible: false
		});
	},
	render: function() {
		return (
			<div className="songBox">
				<img className="songPic" src={this.props.pic}/>
				<p className="songInfo songTitle">{this.props.title}</p>
				<p className="songInfo artist">By: {this.props.band}</p>
				<button onClick = {this.postRequest}>Request</button>
				<Rayon isOpen={this.state.confirmModalVisible} onClose={this.closeConfirmModal} bodyClass="rayon-no-overflow">
						<h3 className="successMsg">"{this.props.title}" has been added to the request list.</h3>
				</Rayon>
			</div>
			);
	},
	postRequest: function() {
		if (this.state.user.get('id')) {
			let newRequest = {
				trackId: this.props.trackId,
				pic: this.props.pic,
				title: this.props.title,
				band: this.props.band,
				userId: this.state.user.get('id')
			};
			this.state.request.set(newRequest);
			let trackIds = Request.pluck('trackId');
			let existingTracks = [];
			trackIds.forEach((track, i, array) => {
				if (this.state.request.get('trackId') === track) {
				Request.set(Request.findWhere({trackId: track}));
				existingTracks.push(Request);
			}});
			if (existingTracks.length) {
				let counter = Request.at(0).get('requestCount');
				counter++;
				Request.at(0).save({
					requestCount: counter
				});
				this.getInitialState;
			} else {
				Request.create(newRequest);
				this.getInitialState;
			}
		} else {
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
			trackIds.forEach((track, i, array) => {
				if (this.state.request.get('trackId') === track) {
				Request.set(Request.findWhere({trackId: track}));
				existingTracks.push(this.state.request);
			}});
			if (existingTracks.length) {
				let counter = Request.at(0).get('requestCount');
				counter++;
				Request.at(0).save({
					requestCount: counter
				});
			} else {
				Request.create(newRequest);
			}
		}
		this.setState({
			confirmModalVisible: true
		});
		this.state.Request.set(Request.fetch({
			data: {
				where: {
					userId: this.props.userId
				}
			}
		}));
	}
});