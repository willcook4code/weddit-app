require('./Authentication');
require('./Accommodation');
require('./Attendee');
require('./Request');
module.exports = bookshelf.model('User', {
	tableName: 'users',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	authentication: function() {
		this.hasMany('Authentication', 'userId');
	},
	accommodation: function() {
		this.hasMany('Accommodation', 'userId');
	},
	attendee: function() {
		this.hasMany('Attendee', 'userId');
	},
	request: function() {
		this.hasMany('Request', 'userId');
	}
});