exports.up = function(knex, Promise) {
	return knex.schema.createTable('songs', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('pic').notNull();
		t.string('title').notNull();
		t.string('band').notNull();
		t.integer('voteCount').notNull();
		t.string('ofUser').notNull();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('songs');
};
