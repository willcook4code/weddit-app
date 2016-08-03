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
			<div className='hotelWrapper mapWrapper'>
				<div className='frameWrap hotelFrame'>
					<Iframe
						url={location}
						width="100%"
						height="100%"
						position="relative"
						float="left"
						frameborder="0" style="border:0"
						allowfullscreen
					/>
				</div>
				<div className="hotelInfo">
				<p className="infoLine infoName">{this.props.name}</p>
				<p className="infoLine">Rate: {this.props.rate}</p>
				<p className="infoLine bookHead">Book by:</p>
				<p className="infoLine">{moment(this.props.cutoffDate).format('MMM Do YYYY')}</p>
				<p className="infoLine" >Reservations: <br className="break"/> {this.props.phoneNumber}</p>
				<a className="hotelSite infoLine" href={url} target='_blank'>Website</a>
				</div>
			</div>
			);
	}
});