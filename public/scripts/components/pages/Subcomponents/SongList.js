import React from 'react';

export default React.createClass({
	render: function() {
		return (
			<div className="songBox">
				<div className="picWrapper">
					<img className="songPic" src={this.props.pic}/>
				</div>
				<p className="songInfo songTitle">{this.props.title}</p>
				<p className="songInfo artist">By: {this.props.band}</p>
				<p className="songInfo requestCount">Requests: {this.props.total}</p>
			</div>
			);
	}
});