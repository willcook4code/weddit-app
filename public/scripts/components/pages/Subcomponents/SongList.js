import React from 'react';

export default React.createClass({
	render: function() {
		return (
			<div className="songBox">
				<div className="picWrapper">
					<img className="songPic" src={this.props.pic}/>
				</div>
				<p className="songTitle">{this.props.title}</p>
				<p className="artist">By: {this.props.band}</p>
			</div>
			);
	}
});