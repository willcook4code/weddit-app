import React from 'react';

export default React.createClass({
	render: function() {
		return(
			<div>
				<p>{this.props.name}</p>
				<button onClick={this.deletePlace}>Remove</button>
			</div>
		);
	},
	deletePlace: function() {
		this.props.location.destroy();
	}
});