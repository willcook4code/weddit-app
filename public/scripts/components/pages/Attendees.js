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
					<Iframe
						url="https://www.google.com/maps/embed/v1/search?key=AIzaSyDORTq8B5-auRcsIQ5pE3lVosmLftZIwmk&q=lodging+and+hotels+near+Inn+At+Wild+Rose+Hall" 
						width="600"
						height="450"
						frameborder="0" style="border:0"
						allowfullscreen
					/>
				</div>
				<div className='songRequestBox'>
				</div>
			</section>
			);
	}
});