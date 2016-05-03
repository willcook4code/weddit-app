import React from 'react';
// import Navigation from './navigation';

export default React.createClass({
	render: function() {
		return (
			<main>
				<Navigation />
				{this.props.children}
			</main>
		);
	}
});