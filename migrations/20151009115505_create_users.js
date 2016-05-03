exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('registrant1').notNull();
		t.string('registrant2').notNull();
		t.string('email').notNull();
		t.string('venueName').notNull();
		t.string('venueZip').notNull();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users');
};
