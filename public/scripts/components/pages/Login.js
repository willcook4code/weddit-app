import React from 'react';
import Rayon from 'rayon';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import user from '../../stores/user';

				
export default React.createClass({
	getInitialState: function() {
		return {
			regModalVisible: false,
			errors: {},
			user: user
		};
	},
	register: function(e) {
	e.preventDefault();
	$.ajax({
		url: '/auth/register',
		type: 'POST',
		data: {
			email: this.refs.email.value,
			password: this.refs.password.value
		},
		success: (loggedArg) => {
			this.state.user.set(loggedArg);
			this.setState({
	            regModalVisible: false
	        });
			browserHistory.push('/profile');
		},
		error: (errorArg) => {
				this.setState({errors: errorArg.responseJSON});
			}
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
		return(
			<div className='regWrapper homeWrapper'>
				<h1 className="introHeader"><i>Planning a wedding?</i></h1>
				<button className="modalOpenBtn" onClick={this.openRegModal}><i>Get Started</i></button>
				<Rayon isOpen={this.state.regModalVisible} onClose={this.closeRegModal}>
					<form className="loginReg" onSubmit={this.register}>
						<div className="regForm">
							<h3 className="formPrompt">Enter your email</h3>
							<input className="modalInput" type='text' placeholder='email@domain.com' ref='email'/>
							<div className='error'>{this.state.errors.email ? this.state.errors.email.message : null} </div>
							<h3 className="formPrompt">Set a password</h3>
							<input className="modalInput modalAccessInput" type='password' ref='password'/>
							<div className="error">{this.state.errors.password ? this.state.errors.password.message : null}</div>
						</div>
						<footer>
							<button type='submit'>Register</button>
							<button type='button' onClick={this.closeRegModal}>Close</button>
						</footer>
					</form>
				</Rayon>
			</div>
			);
	}
});