import React from 'react';
import {Link, browserHistory} from 'react-router';
import user from '../stores/user';
import Rayon from 'rayon';
import $ from 'jquery';


export default React.createClass({
	getInitialState: function() {
		return {
			user: user,
			logModalVisible: false,
			errors: {}
		};
	},
	componentDidMount: function() {
		this.state.user.on('change', () => {
			this.setState({
				user: user
			});
		});
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
				this.setState({
		            logModalVisible: false
		        });
				browserHistory.push('/profile');
			},
			error: (errorArg) => {
					this.setState({errors: errorArg.responseJSON});
			}
		});
	},
	openLogModal: function() {
        this.setState({
            logModalVisible: true
        });
    },
    closeLogModal: function() {
        this.setState({
            logModalVisible: false
        });
    },
	render: function() {
		if (this.state.user.get('id')) {
			return(
				<nav>
					<Link className="navLinks logo" to="/"><img className="logoPic" src="./../../../images/Weddit_Logo.png"/></Link>
					<Link className="navLinks" to="/profile">Profile</Link>
					<Link className="navLinks" to="/attendees">Attendees</Link>
					<a href="#" className="navLinks" onClick={this.logout}>Logout</a>
				</nav>
			);
		} else {
			return (
				<nav>
					<Link className="navLinks logo" to="/"><img className="logoPic" src="./../../../images/Weddit_Logo.png"/></Link>
					<a className="navLinks loginLink" onClick={this.openLogModal}>Login</a>
					<Rayon isOpen={this.state.logModalVisible} onClose={this.closeLogModal} bodyClass="rayon-no-overflow">
						<form className='loginForm' onSubmit={this.login}>
							<input type='email' placeholder='email@domain.com' className='loginField' ref='email'/>
							<div className='error'>{this.state.errors.email ? this.state.errors.email.message : null} </div>
							<input type='password' placeholder='password' className='loginField' ref='password'/>
							<div className="error">{this.state.errors.password ? this.state.errors.password.message : null}</div>
							<button type='submit' className='button loginButton'>Login</button>
						</form>
					</Rayon>
				</nav>
			);
		}
	},
	logout: function(e) {
		e.preventDefault();
		this.state.user.clear();
		$.ajax({
			type: 'POST',
			url: '/auth/logout'
		});
		browserHistory.push('/');
	}
});

