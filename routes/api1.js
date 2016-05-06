let express = require('express');
let router = express.Router();
let path = require('path');
let bookshelfApi = require('bookshelf-api') ({
	path: path.join(__dirname, '..', 'models')
});

router.use('/public', bookshelfApi);

router.use('/', 
	function(req, res, next){
		req.body.userId = req.user.id;
		next();
	},
	bookshelfApi);

module.exports = router;
