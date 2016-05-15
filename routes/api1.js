let express = require('express');
let router = express.Router();
let path = require('path');
let bookshelfApi = require('bookshelf-api') ({
	path: path.join(__dirname, '..', 'models')
});
let loggedIn = require('../lib/middleware/logged-in');

const attachUser = function(req, res, next){
	req.body.userId = req.user.id;
	next();
};

router.get('/user', loggedIn, bookshelfApi);
router.post('/attendee', loggedIn, attachUser, bookshelfApi);
router.post('/accommodation', loggedIn, attachUser, bookshelfApi);
router.post('/bio', loggedIn, attachUser, bookshelfApi);

router.use('/', bookshelfApi);

module.exports = router;
