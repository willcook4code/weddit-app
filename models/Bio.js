require('./User');
module.exports = bookshelf.model('Bio', {
	tableName: 'bios',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	user: function() {
		return this.belongsTo('User', 'userId');
	}
});