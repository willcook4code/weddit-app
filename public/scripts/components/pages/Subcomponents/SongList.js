import React from 'react';

export default React.createClass({
	render: function() {
		return (
			<div>
				<img src={this.props.pic}/>
				<p>{this.props.title}</p>
				<p>By: {this.props.band}</p>
			</div>
			);
	}
});