import React from 'react';
import Rayon from 'rayon';
import user from '../../stores/user';
import Bio from '../../collections/BioCollection';

export default React.createClass({
	getInitialState: function() {
		return {
			regModalVisible: false,
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
	addRegistry: function(e) {
		e.preventDefault();
		if (Bio.length) {
			if  (this.refs.registry1.value === '') {
				Bio.at(0).save({
					registry2: this.refs.registry2.value
				});
			} else if (this.refs.registry2.value === '') {
				Bio.at(0).save({
					registry1: this.refs.registry1.value
				});
			} else {
				Bio.at(0).save({
					registry1: this.refs.registry1.value,
					registry2: this.refs.registry2.value
				});
			}
		} else {
			if  (this.refs.registry1.value === '') {
				Bio.create({
					registry2: this.refs.registry2.value,
					userId: this.state.user.get('id')
				});
			} else if (this.refs.registry2.value === '') {
				Bio.create({
					registry1: this.refs.registry1.value,
					userId: this.state.user.get('id')
				});
			} else {
				Bio.create({
					registry1: this.refs.registry1.value,
					registry2: this.refs.registry2.value,
					userId: this.state.user.get('id')
				});
			}
		}
		this.setState({
			addedMsg: 'Your information has been submitted.'
		});
	},
	openRegModal: function() {
		this.setState({
			regModalVisible: true
		});
	},
	closeRegModal: function() {
		this.setState({
			regModalVisible: false
		});
	},
	render: function() {
		return (
			<div>
				<button onClick={this.openRegModal} className="addBioBtn addListingBtn">Add Registry</button>
					<Rayon isOpen={this.state.regModalVisible} onClose={this.closeRegModal} bodyClass="rayon-no-overflow">
						<form className="addMod bioModal">
							<h3 className="formPrompt">Registry 1 Url</h3>
							<input className="modalInput" type='text' placeholder='optional' ref='registry1'/>
							<h3 className="formPrompt">Registry 2 Url</h3>
							<input className="modalInput" type='text' placeholder='optional' ref='registry2'/>
							<p className="addedMsg">{this.state.addedMsg}</p>
							<footer>
								<a className="submitAdd" href="#" onClick={this.addRegistry}>Add Registry</a>
								<button type='button' onClick={this.closeRegModal}>Close</button>
							</footer>
						</form>
					</Rayon>
			</div>
			);
	}
});