exports.up = function(knex, Promise) {
	return knex.schema.createTable('attendees', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('name').notNull();
		t.string('accessCode').notNull();
		t.integer('party')
			.notNull()
			.defaultTo(0);
		t.string('maxGuests')
			.notNull()
			.defaultTo('1');
		t.boolean('isGoing').nullable();

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
