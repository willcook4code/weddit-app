import React from 'react';
import Scrapbook from '../../collections/ScrapbookCollection';
import PhotoDisplay from './Subcomponents/PhotoDisplay';
import user from '../../stores/user';

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
	render: function() {
		let eachImage = Scrapbook.models.filter((photo, i, array) => {
			if (photo.get('inSlideshow')) {
				return true;
			} else {
				return false;
			}
		}).map((photo, i, array) => {
			return (
				<PhotoDisplay 
				key = {i}
				name = {photo.get('name')}
				pic = {photo.get('pic')}
				caption = {photo.get('caption')}
				/>
			);
		});
		return(
			<section>
				<div>
					{eachImage}
				</div>
			</section>
		);
	}
});