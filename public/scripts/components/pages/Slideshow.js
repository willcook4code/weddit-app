import React from 'react';
import Scrapbook from '../../collections/ScrapbookCollection';
import user from '../../stores/user';
import $ from 'jquery';

export default React.createClass({
	getInitialState: function() {
		return {
			Scrapbook: Scrapbook,
			user: user
		};
	},
	componentDidMount: function() {
		this.state.user.on('update change', this.updateUser);
		Scrapbook.on('update', this.updateScrapbook);
		Scrapbook.fetch({
			data: {
				where: {userId: user.get('id')}
			}
		});
	},
	componentWillUnmount: function() {
		this.state.user.off('update change', this.updateUser);
		Scrapbook.off('update', this.updateScrapbook);
	},
	updateUser: function() {
		this.setState({
			user: this.state.user
		});
	},
	updateScrapbook: function() {
		this.setState({
			Scrapbook: Scrapbook
		});
	},
	runSlideshow: function() {
		setInterval(() => {
				$('.slideWrapper').animate({marginLeft: '-628px'},1000,function(){
					$(this).find('li:last').after($(this).find('li:first'));
					$(this).css({marginLeft:'0'});
				});
			},5000);
	},
	render: function() {
		let eachImage = Scrapbook.models.filter((photo, i, array) => {
			if (photo.get('inSlideshow')) {
				return true;
			} else {
				return false;
			}
		}).map((photo, i, array) => {
			return (
				<li key={i} className="slideContainer">
				<img className="slide" id={i} src={photo.get('pic')}/>
				</li>
			);
		});
		return(
			<div className="slider">
				<button className="runSlideshow" onClick={this.runSlideshow}> Run Slideshow </button>
				<ul className="slideWrapper">
				{eachImage}
				</ul>
			</div>
		);
	}
});