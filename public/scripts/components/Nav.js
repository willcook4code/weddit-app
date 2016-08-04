import React from 'react';
import {Link, browserHistory} from 'react-router';
import user from '../stores/user';
import attendee from '../stores/attendee';
import Rayon from 'rayon';
import $ from 'jquery';


export default React.createClass({
	getInitialState: function() {
		return {
			user: user,
			attendee: attendee,
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
		this.state.attendee.on('change', () => {
			this.setState({
				attendee: attendee
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
					$('.error').show();
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
 //    scrollToHotel: function() {
	//     $('.hotelNav').animate({scrollTop: ($('#hotel').position().top + '15em')},1000);
	// },
	// scrollToVenue: function() {
	//     $('.venueNav').animate({scrollTop: ($('#venue').position().top + '15em')},1000);
	// },
	render: function() {
		if (this.state.user.get('id')) {
			return(
				<nav>
					<Link className="navLinks logo" to="/"><img className="logoPic" src="./../../../images/Weddit_Logo.png"/></Link>
					<div className="navLinkContainer">
						<a href="#" className="navLinks pageLink" onClick={this.logout}>Logout</a>
						<Link className="navLinks pageLink" to="/attendees">Attendees</Link>
						<Link className="navLinks pageLink" to="/profile">Profile</Link>
					</div>
				</nav>
			);
		} else if (this.state.attendee.get('isGoing')) {
			return (
				<nav>
					<Link className="navLinks logo" to="/"><img className="logoPic" src="./../../../images/Weddit_Logo.png"/></Link>
					<a className="navLinks pageLink hotelNav" href="#hotel" onClick={this.scrollToHotel}>Hotels</a>
					<a className="navLinks pageLink venueNav" href="#venue" onClick={this.scrollToVenue}>Venue(s)</a>
				</nav>
				);
		}else {
			return (
				<nav>
					<Link className="navLinks logo" to="/"><img className="logoPic" src="./../../../images/Weddit_Logo.png"/></Link>
					<a className="navLinks pageLink" onClick={this.openLogModal}>Login</a>
					<Rayon isOpen={this.state.logModalVisible} onClose={this.closeLogModal}>
						<form className='loginReg' onSubmit={this.login}>
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

