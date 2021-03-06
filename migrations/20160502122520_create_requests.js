exports.up = function(knex, Promise) {
	return knex.schema.createTable('requests', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('trackId').notNull();
		t.string('pic').notNull();
		t.string('title').notNull();
		t.string('band').notNull();
		t.integer('requestCount').notNull().defaultTo(1);

		t.integer('userId')
			.unsigned()
			.notNull()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('requests');
};
