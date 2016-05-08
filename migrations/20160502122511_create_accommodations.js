exports.up = function(knex, Promise) {
	return knex.schema.createTable('accommodations', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('name').notNull();
		t.string('zip').notNull();
		t.string('locationType').notNull();
		t.string('hotelUrl').nullable();
		t.string('rate').nullable();
		t.date('cutoffDate').nullable();

		t.integer('userId')
			.unsigned()
			.notNull()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('accommodations');
};
