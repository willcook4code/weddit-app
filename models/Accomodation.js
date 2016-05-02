require('./User');
module.exports = bookshelf.model('Accomodation', {
	tableName: 'accomodations',
	hasTimestamps: ['createdAt', 'updatedAt', 'deletedAt'],
	user: function() {
		return this.belongsTo('User', 'userId');
	}
});