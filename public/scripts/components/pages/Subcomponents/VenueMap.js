import React from 'react';
import Iframe from 'react-iframe';

export default React.createClass({
	render: function() {
		
		let venue = function(name) {
			let wordsArr = [];
			let newSent = [];
			let sentArr = name.split(' ');
			for (var i = 0; i < sentArr.length; i++) {
				wordsArr.push(sentArr[i].split(' '));
			}
			for(var x = 0; x < wordsArr.length; x++) {
					newSent.push(wordsArr[x].join('+'));
			}
			return newSent.join('+');
		};
		let location = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDORTq8B5-auRcsIQ5pE3lVosmLftZIwmk&q='+venue(this.props.venName)+','+this.props.venZip;
		return(
			<div className='venueWrapper'>
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