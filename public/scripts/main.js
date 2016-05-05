import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import $ from 'jquery';
import Attendees from './components/Pages/Attendees';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import App from './components/App';

$.ajaxSetup({
	headers: {
		Accept: 'application/json'
	}
});

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
