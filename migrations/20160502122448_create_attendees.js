exports.up = function(knex, Promise) {
	return knex.schema.createTable('attendees', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('name').notNull();
		t.string('accessCode').notNull();
		t.integer('guests').notNull();
		t.boolean('isGoing').notNull().defaultTo(false);

		t.integer('userId')
			.unsigned()
			.notNull()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('attendees');
};
