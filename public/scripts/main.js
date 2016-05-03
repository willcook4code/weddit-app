import React from 'react';
import ReatDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

const router = (
	<Router history={browserHistory}>
		 <Route path='/' component={App}>
	      <IndexRoute component={Home} />
	      <Route path='profile' component={Profile}/>
	      <Route path='attendees' component={Attendees} />
	    </Route>
	</Router>
);

ReactDOM.render(router, document.querySelector('main'));
