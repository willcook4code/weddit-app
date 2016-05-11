import React from 'react';
import Iframe from 'react-iframe';

export default React.createClass({
	render: function() {
		let location = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyDORTq8B5-auRcsIQ5pE3lVosmLftZIwmk&q='+this.props.searchType+'+near+'+this.props.areaZip;
		return(
			<div className='nearbyMaps'>
				<h2>{this.props.searchType}</h2>
				<Iframe
					url={location}
					width="300"
					height="225"
					position="relative"
					frameborder="0" style="border:0"
					allowfullscreen
				/>
			</div>
			);
	}
});