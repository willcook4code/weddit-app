import React from 'react';
import Scrapbook from '../../collections/ScrapbookCollection';
import PhotoDisplay from './Subcomponents/PhotoDisplay';
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
		let eachImage = Scrapbook.models.filter((photo, i, array) => {
			if (photo.get('inSlideshow')) {
				return true;
			} else {
				return false;
			}
		});
		console.log(eachImage.length);
		$('#0').fadeToggle('slow');
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
				<img className="slide" id={i} key={i} src={photo.get('pic')}/>
			);
		});
		return(
			<div className="slider">
				<button onClick={this.runSlideshow}> Run Slideshow </button>
				{eachImage}
			</div>
		);
	}
});