import React from 'react';

export default React.createClass({
	render: function() {
		let photoCap = null;
		if (this.props.caption === '') {
			photoCap = 'Not Entered';
		} else {
			photoCap = this.props.caption;
		}
		return (
			<div>
				<img src={this.props.pic}/>
				<p>Caption: {photoCap}</p>
				<p>Submitted by: {this.props.name}</p>
			</div>
		);
	}
});