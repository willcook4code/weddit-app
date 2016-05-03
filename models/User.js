require('./Authentication');
require('./Accommodation');
require('./Attendee');
require('./Song');
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
	song: function() {
		this.hasMany('Song', 'userId');
	}
});