require('./Authentication');
require('./Accommodation');
require('./Attendee');
require('./Request');
require('./Bio');
module.exports = bookshelf.model('User', {
	tableName: 'users',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	authentication: function() {
		return this.hasMany('Authentication', 'userId');
	},
	accommodation: function() {
		return this.hasMany('Accommodation', 'userId');
	},
	attendee: function() {
		return this.hasMany('Attendee', 'userId');
	},
	request: function() {
		return this.hasMany('Request', 'userId');
	},
	bio: function() {
		return this.belongsTo('Bio', 'userId');
	}
});