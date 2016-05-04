import React from 'react';
import Rayon from 'rayon';

export default React.createClass({
	getInitialState: function() {
		return {
			regModalVisible: false,
			rsvpModalVisible: false
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
						<section>Registration Form</section>
						<footer>
							<button onClick={this.closeRegModal}>Close</button>
						</footer>
					</Rayon>
				</div>
				<div className='attendeeLogin'>
					<h1 className='loginType'>Attendee Links</h1>
					<button className='attendeeLink' onClick={this.openRsvpModal}>RSVP</button>
					<Rayon isOpen={this.state.rsvpModalVisible} onClose={this.closeRsvpModal}>
						<section>RSVP Form</section>
						<footer>
							<button onClick={this.closeRsvpModal}>Close</button>
						</footer>
					</Rayon>
					<button className='attendeeLink'>Event Info</button>
				</div>
			</section>
			);
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