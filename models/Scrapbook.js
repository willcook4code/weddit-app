require('./User');
module.exports = bookshelf.model('Scrapbook', {
	tableName: 'scrapbook',
	hasTimestamps: ['createdAt', 'updatedAt'],
	user: function() {
		return this.belongsTo('User', 'userId');
	}
});