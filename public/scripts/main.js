import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import $ from 'jquery';
import Attendees from './components/Pages/Attendees';
import Slideshow from './components/Pages/Slideshow';
import Home from './components/Pages/Home';
import Profile from './components/Pages/Profile';
import App from './components/App';
import user from './stores/user';

$.ajaxSetup({
	headers: {
		Accept: 'application/json'
	}
});
function requireAuth(nextState, replace) {
	  if (!user.get('id')) {
	    replace({
	      pathname: '/'
	    });
	}
}

filepicker.setKey('Ag3tUE5dSvu5zBGHOQGl0z');
const router = (
	<Router history={browserHistory}>
		 <Route path='/' component={App}>
	      <IndexRoute component={Home} />
	      <Route path='profile' component={Profile} onEnter={requireAuth}/>
	      <Route path='attendees' component={Attendees} />
	      <Route path='slideshow' component={Slideshow} onEnter={requireAuth}/>
	    </Route>
	</Router>
);

ReactDOM.render(router, document.querySelector('main'));
