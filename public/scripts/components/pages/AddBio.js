import React from 'react';
import Rayon from 'rayon';
import user from '../../stores/user';
import Bio from '../../collections/BioCollection';

export default React.createClass({
	getInitialState: function() {
		return {
			bioModalVisible: false,
			user: user,
			addedMsg: null,
			Bio: Bio
		};
	},
	componentWillMount: function() {
		this.state.user.on('add', this.updateUser);
		Bio.on('update change', this.updateBioCol);
		Bio.fetch({
			data: {
				where: {
					userId: this.state.user.get('id')
				}
			}
		});
	},
	componentWillUnmount: function() {
		this.state.user.off('add', this.updateUser);
		Bio.off('update change', this.updateBioCol);
	},
	updateUser: function() {
		this.setState({
			user: user
		});
	},
	addBio: function(e) {
		e.preventDefault();
		if (Bio.length) {
			Bio.at(0).save({
				registrant1: this.refs.registrant1.value,
				registrant2: this.refs.registrant2.value,
				story: this.refs.story.value,
				registry1: this.refs.registry1.value,
				registry2: this.refs.registry2.value,
				userId: this.state.user.get('id')
			});
		} else {
			Bio.create({
				registrant1: this.refs.registrant1.value,
				registrant2: this.refs.registrant2.value,
				story: this.refs.story.value,
				registry1: this.refs.registry1.value,
				registry2: this.refs.registry2.value,
				userId: this.state.user.get('id')
			});
		}
		this.setState({
			addedMsg: 'Your information has been submitted.'
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
						<form className="addMod bioModal">
							<h3 className="formPrompt">Your First & Last Name</h3>
							<input className="modalInput" type='text' placeholder='First Last' ref='registrant1'/>
							<h3 className="formPrompt">Your Partner's First & Last Name</h3>
							<input className="modalInput" type='text' placeholder='First Last' ref='registrant2'/>
							<h3 className="formPrompt">Tell Us Your Story</h3>
							<textarea className="modalInput" type='textarea' ref='story'/>
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