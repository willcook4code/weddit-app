import React from 'react';
import Iframe from 'react-iframe';

export default React.createClass({
	render: function() {
		return(
			<section className='attendeesPage'>
				<div className='hotelDisplay'>
					<h2>Hotels</h2>

				</div>
				<div className='wideSearchDisplay'>
					<h2>Other Hotels</h2>
					<Iframe
						url="https://www.google.com/maps/embed/v1/search?key=AIzaSyDORTq8B5-auRcsIQ5pE3lVosmLftZIwmk&q=lodging+and+hotels+near+Inn+At+Wild+Rose+Hall" 
						width="300"
						height="225"
						position="relative"
						frameborder="0" style="border:0"
						allowfullscreen
					/>
				</div>
				<div className='songRequestBox'>
					<h2>Request a Song!</h2>
					<input type='text' placeholder='Song Title'/>
					<button type='submit'>Search</button>
				</div>
			</section>
			);
	}
});