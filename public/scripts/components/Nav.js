import React from 'react';
import {Link, browserHistory} from 'react-router';
import user from '../models/user';
import $ from 'jquery';


export default React.createClass({
	getInitialState: function() {
		return {
			user: user
		};
	},
	componentDidMount: function() {
		this.state.user.on('change', () => {
			this.setState({
				user: user
			});
		});
	},
	render: function() {
		if (this.state.user.get('id')) {
			return(
				<nav>
					<Link className="logo" to="/">LOGO</Link>
					<Link className="navLinks" to="/profile">Profile</Link>
					<Link className="navLinks" to="/attendees">Attendees</Link>
					<a href="#" className="navLinks" onClick={this.logout}>Logout</a>
				</nav>
			);
		} else {
			return (
				<nav>
					<Link className="logo" to="/">LOGO</Link>
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

