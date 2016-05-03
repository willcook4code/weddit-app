exports.up = function(knex, Promise) {
	return knex.schema.createTable('accommodations', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('hotelName').notNull();
		t.string('hotelZip').notNull();
		t.string('hotelUrl').notNull();
		t.integer('rate').nullable();
		t.string('cutoffDate').nullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('accommodations');
};
