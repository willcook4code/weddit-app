import React from 'react';
import {Link, browserHistory} from 'react-router';

export default React.createClass({
	render: function() {
		return(
			<nav>
				<Link to="/">LOGO</Link>
				<a href="#" className="navLinks">Logout</a>
				<Link className="navLinks" to="/profile">Profile</Link>
				<Link className="navLinks" to="/attendees">Attendees</Link>
			</nav>
			);
	}
})