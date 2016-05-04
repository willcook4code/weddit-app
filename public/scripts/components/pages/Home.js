import React from 'react';
import Rayon from 'rayon';

export default React.createClass({
	getInitialState: function() {
		return {
			regModalVisible: false,
			rsvpModalVisible: false,
			infoModalVisible: false
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
						<form onSubmit={this.closeRegModal}>
							<p>Registration Form</p>
							<footer>
								<button>Submit</button>
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
							<footer>
								<button type='submit'>Submit</button>
							</footer>
						</form>
					</Rayon>
					<button className='attendeeLink' onClick={this.openInfoModal}>Event Info</button>
					<Rayon isOpen={this.state.infoModalVisible} onClose={this.closeInfoModal}>
						<form onSubmit={this.closeInfoModal}>
							<p>Info Link</p>
							<footer>
								<button>Go to Info Page</button>
							</footer>
						</form>
					</Rayon>
				</div>
			</section>
			);
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