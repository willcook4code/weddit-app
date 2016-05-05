import React from 'react';
import Rayon from 'rayon';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import user from '../../models/user';

export default React.createClass({
	getInitialState: function() {
		return {
			regModalVisible: false,
			rsvpModalVisible: false,
			infoModalVisible: false,
			user: user
		};
	},
	render: function() {
		return(
			<section className='homePage'>
				<div className='userLogin'>
					<h1 className='loginType'>Users</h1>
					<h3>Login</h3>
					<input type='email' placeholder='email@domain.com' className='loginField'/>
					<input type='password' placeholder='password' className='loginField'/>
					<button type='submit' className='button loginButton'>Login</button>
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
							<h3>password</h3>
							<input type='password' ref='password'/>
							<h3>Venue</h3>
							<input type='text' placeholder='eg: Downton Abbey' ref='venueName'/>
							<h3>Venue Zip</h3>
							<input type='text' placeholder='eg: 78701' ref='venueZip'/>
							<footer>
								<button type='submit'>Register</button>
								<button onClick={this.closeRegModal}>Close</button>
							</footer>
						</form>
					</Rayon>
				</div>
				<div className='attendeeLogin'>
					<h1 className='loginType'>Attendee Links</h1>
					<button className='attendeeLink' onClick={this.openRsvpModal}>RSVP</button>
					<Rayon isOpen={this.state.rsvpModalVisible} onClose={this.closeRsvpModal}>
						<form onSubmit={this.closeRsvpModal}>
							<p>RSVP Form</p>
							<h3>Your Name</h3>
							<input type='text' placeholder='Please enter as appears on invite'/>
							<h3>Please Enter Your Access Code</h3>
							<input type='text'/>
							<h3>Number Attending</h3>
							<input type='number' min='0' max='4'/>
							<footer>
								<button>Accept</button>
								<button>Decline</button>
							</footer>
						</form>
					</Rayon>
					<button className='attendeeLink' onClick={this.openInfoModal}>Event Info</button>
					<Rayon isOpen={this.state.infoModalVisible} onClose={this.closeInfoModal}>
						<form onSubmit={this.closeInfoModal}>
							<p>Info Link</p>
							<h3>Please Enter Your Access Code</h3>
							<input type='text'/>
							<footer>
								<button>Go to Info Page</button>
							</footer>
						</form>
					</Rayon>
				</div>
			</section>
			);
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
			password: this.refs.password.value,
			venueName: this.refs.venueName.value,
			venueZip: this.refs.venueZip.value
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
	openInfoModal: function() {
        this.setState({
            infoModalVisible: true
        });
    },
    closeInfoModal: function() {
        this.setState({
            infoModalVisible: false
        });
    },
	openRsvpModal: function() {
        this.setState({
            rsvpModalVisible: true
        });
    },
    closeRsvpModal: function() {
        this.setState({
            rsvpModalVisible: false
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
    }
});