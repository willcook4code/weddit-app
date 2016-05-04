import React from 'react';
import Nav from './Nav';

export default React.createClass({
	render: function() {
		return (
			<main>
				<Nav />
				{this.props.children}
			</main>
		);
	}
});