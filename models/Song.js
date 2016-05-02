require('./User');
module.exports = bookshelf.model('Song', {
	tableName: 'songs',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	user: function() {
		return this.belongsTo('User', 'userId');
	}
});