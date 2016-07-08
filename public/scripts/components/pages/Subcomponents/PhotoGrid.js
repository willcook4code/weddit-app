import React from 'react';
import PhotoDisplay from './PhotoDisplay';

export default React.createClass({
	editSlideshow: function() {
		let slideshowStatus = null;
		if (this.props.inSlideshow) {
			slideshowStatus = false;
		} else {
			slideshowStatus = true;
		}
		this.props.thisPhoto.save({
			inSlideshow: slideshowStatus
		});
	},
	render: function() {
		let displayed = '';
		if (this.props.inSlideshow) {
			displayed = 'Remove from Slideshow';
		} else {
			displayed = 'Add to Slideshow';
		}
		return(
			<div className="PhotoGrid Wrapper">
				<PhotoDisplay 
				name = {this.props.name}
				pic = {this.props.pic}
				caption = {this.props.caption}
				thisPhoto = {this.props.thisPhoto}
				/>
				<button className="slideshowToggleBtn" onClick={this.editSlideshow}>{displayed}</button>
			</div>
		);
	}
});




			