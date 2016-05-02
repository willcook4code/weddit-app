require('./User');
module.exports = bookshelf.model('Attendee', {
	tableName: 'attendees',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	user: function() {
		return this.belongsTo('User', 'userId');
	}
});