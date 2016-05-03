require('./User');
module.exports = bookshelf.model('Accommodation', {
	tableName: 'accommodations',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	user: function() {
		return this.belongsTo('User', 'userId');
	}
});