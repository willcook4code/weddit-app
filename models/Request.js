require('./User');
module.exports = bookshelf.model('Request', {
	tableName: 'requests',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	user: function() {
		return this.belongsTo('User', 'userId');
	}
});