import React from 'react';
import Rayon from 'rayon';
import user from '../../stores/user';
// import Bio from '../../collections/BioCollection';
import bio from '../../stores/bio';

export default React.createClass({
	getInitialState: function() {
		return {
			bioModalVisible: false,
			user: user,
			addedMsg: null,
			bio: bio
		};
	},
	componentDidMount: function() {
		this.state.user.on('add', this.updateUser);
		this.state.user.on('update change', this.updateBio);
		this.state.bio.fetch({
			data: {
				where: {
					userId: this.state.user.get('id')
				}
			}
		});
	},
	componentWillUnmount: function() {
		this.state.user.off('add', this.updateUser);
		this.state.user.off('update change', this.updateBio);
	},
	updateUser: function() {
		this.setState({
			user: user
		});
	},
	updateBio: function() {
		this.setState({
			bio: this.state.bio
		});
	},
	addBio: function(e) {
		e.preventDefault();
		bio.save({
			registrant1: this.refs.registrant1.value,
			registrant2: this.refs.registrant2.value,
			story: this.refs.story.value,
			registry1: this.refs.registry1.value,
			registry2: this.refs.registry2.value,
			userId: this.state.user.get('id')
		});
	},
	openBioModal: function() {
		this.setState({
			bioModalVisible: true
		});
	},
	closeBioModal: function() {
		this.setState({
			bioModalVisible: false
		});
	},
	render: function() {
		return (
			<div>
				<button onClick={this.openBioModal} className="addBioBtn addListingBtn">Add Bio</button>
					<Rayon isOpen={this.state.bioModalVisible} onClose={this.closeBioModal} bodyClass="rayon-no-overflow">
						<form className="addMod">
							<h3 className="formPrompt">Your First & Last Name</h3>
							<input className="modalInput" type='text' placeholder='First Last' ref='registrant1'/>
							<h3 className="formPrompt">Your Partner's First & Last Name</h3>
							<input className="modalInput" type='text' placeholder='First Last' ref='registrant2'/>
							<h3 className="formPrompt">Tell Us Your Story</h3>
							<textarea className="modalInput" type='textarea' ref='story'/>
							<h3 className="formPrompt">Registry 1 Url</h3>
							<input className="modalInput" type='text' placeholder='optional' ref='registry1'/>
							<h3 className="formPrompt">Registry 2 Url</h3>
							<input className="modalInput" type='text' placeholder='optional' ref='registry2'/>
							<p className="addedMsg">{this.state.addedMsg}</p>
							<footer>
								<a className="submitAdd" href="#" onClick={this.addBio}>Add Bio</a>
								<button type='button' onClick={this.closeBioModal}>Close</button>
							</footer>
						</form>
					</Rayon>
			</div>
			);
	}
});