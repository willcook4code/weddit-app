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
	login: function(e) {
	e.preventDefault();
	$.ajax({
		url: '/auth/login',
		type: 'POST',
		data: {
			email: this.refs.email.value,
			password: this.refs.password.value
		},
		success: (loggedArg) => {
			this.state.user.set(loggedArg);
			browserHistory.push('/profile');
		},
		error: (errorArg) => {
				this.setState({errors: errorArg.responseJSON});
			}
		});
	},
	register: function(e) {
	e.preventDefault();
	$.ajax({
		url: '/auth/register',
		type: 'POST',
		data: {
			registrant1: this.refs.registrant1.value,
			registrant2: this.refs.registrant2.value,
			email: this.refs.email.value,
			password: this.refs.password.value
		},
		success: (loggedArg) => {
			this.state.user.set(loggedArg);
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
			<div className='userLogin'>
				<h1 className='loginType'>Users</h1>
				<h3>Login</h3>
				<form className='loginForm' onSubmit={this.login}>
					<input type='email' placeholder='email@domain.com' className='loginField' ref='email'/>
					<div className='error'>{this.state.errors.email ? this.state.errors.email.message : null} </div>
					<input type='password' placeholder='password' className='loginField' ref='password'/>
					<div className="error">{this.state.errors.password ? this.state.errors.password.message : null}</div>
					<button type='submit' className='button loginButton'>Login</button>
				</form>
				<p>Need to register an account?  Start <a href='#' onClick={this.openRegModal}>HERE</a>.</p>
				<Rayon isOpen={this.state.regModalVisible} onClose={this.closeRegModal}>
					<form onSubmit={this.register}>
						<p>Registration Form</p>
						<h3>Your Name</h3>
						<input type='text' placeholder='First Last' ref='registrant1'/>
						<h3>Your Partner's Name</h3>
						<input type='text' placeholder='First Last' ref='registrant2'/>
						<h3>email</h3>
						<input type='text' placeholder='email@domain.com' ref='email'/>
						<div className='error'>{this.state.errors.email ? this.state.errors.email.message : null} </div>
						<h3>password</h3>
						<input type='password' ref='password'/>
						<div className="error">{this.state.errors.password ? this.state.errors.password.message : null}</div>
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