import React from 'react';

export default React.createClass({
	render: function() {
		return(
			<section className='homePage'>
				<div className='userLogin'>
					<h1 className='loginType'>Users</h1>
					<h3>Login</h3>
					<input type='email' placeholder='email@domain.com' className='loginField'/>
					<input type='password' placeholder='password' className='loginField'/>
					<button type='submit' className='button loginButton'>Login</button>
					<p>Need to register an account?  Start <a href='#'>HERE</a>.</p>
				</div>
				<div className='attendeeLogin'>
					<h1 className='loginType'>Attendee Links</h1>
					<button className='attendeeLink'>RSVP</button>
					<button className='attendeeLink'>Event Info</button>
				</div>
			</section>
			);
	}
});