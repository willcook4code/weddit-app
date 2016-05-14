import React from 'react';
import Rayon from 'rayon';
import user from '../../stores/user';
import Attendees from '../../collections/AttendeeCollection';

export default React.createClass({
	getInitialState: function() {
		return {
			inviteModalVisible: false,
			user: user,
			addedMsg: null
		};
	},
	componentDidMount: function() {
		this.state.user.on('add', () => {
			this.setState({
				user: user
			});
		});
	},
	// componentDidUnmount: function() {
	// 	this.state.user.off('add', () => {
	// 		this.setState({
	// 			user: user
	// 		});
	// 	});
	// },
	enterAttendee: function(e) {
		e.preventDefault();
		let newAttendee = {
			name: this.refs.name.value,
			accessCode: this.state.user.get('id')+'-'+this.randomPW(),
			party: 0,
			maxGuests: this.refs.max.value
		};
		Attendees.create(newAttendee);
		this.setState({
			addedMsg: this.refs.name.value+' was added with a maximum allotment of '+this.refs.max.value+' to their party.'
		});
		this.refs.name.value = '';
		this.refs.max.value = '';
	},
	openInviteModal: function() {
		this.setState({
			inviteModalVisible: true
		});
	},
	closeInviteModal: function() {
		this.setState({
			inviteModalVisible: false
		});
	},
	render: function() {
		return (
			<div>
				<button onClick={this.openInviteModal} className="addListingBtn">Add Invites</button>
				<Rayon isOpen={this.state.inviteModalVisible} onClose={this.closeInviteModal} bodyClass="rayon-no-overflow">
					<form className="addMod">
						<h3 className="formPrompt">Primary Name</h3>
						<input className="modalInput" type='text' placeholder='eg: Sam Smith' ref='name'/>
						<h3 className="formPrompt">Maximum Number of Guests</h3>
						<input className="modalInput" type='text' placeholder='eg: 4' ref='max'/>
						<p>{this.state.addedMsg}</p>
						<footer>
							<a className="submitAdd" href="#" onClick={this.enterAttendee}>Add Party</a>
							<button type='button' onClick={this.closeInviteModal}>Close</button>
						</footer>
					</form>
				</Rayon>
			</div>
			);
	},
	randomPW: function () {	
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890';
	let code = '';
	for (let x = 0; x < 4; x++) {
    	let i = Math.floor(Math.random() * chars.length);
    	code += chars.charAt(i);
	 	}
	return code;
	}
});