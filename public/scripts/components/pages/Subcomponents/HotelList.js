import React from 'react';
import Iframe from 'react-iframe';
import moment from 'moment';

export default React.createClass({
	render: function() {
		let hotel = function(name) {
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
		let location = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyDORTq8B5-auRcsIQ5pE3lVosmLftZIwmk&q='+hotel(this.props.name)+','+this.props.zip;
		let url = null;
		if (this.props.hotelUrl.indexOf('http://') === -1) {
			url = 'http://'+this.props.hotelUrl;
		} else {
			url = this.props.hotelUrl;
		}
		return(
			<div className='hotelWrapper'>
				<Iframe
					url={location}
					width="300"
					height="225"
					position="relative"
					frameborder="0" style="border:0"
					allowfullscreen
				/>
				<a href={url} target='_blank'>Website</a>
				<p>{moment(this.props.cutoffDate).format('MMM Do YYYY')}</p>
				<p>{this.props.rate}</p>
			</div>
			);
	}
});