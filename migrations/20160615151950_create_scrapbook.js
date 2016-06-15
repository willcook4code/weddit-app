exports.up = function(knex, Promise) {
  return knex.schema.createTable('scrapbook', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('pic').notNull();
		t.string('name').notNull();
		t.string('caption').nullable();
		t.boolean('inSlideshow')
			.notNull()
			.defaultTo(true);

		t.integer('userId')
			.unsigned()
			.notNull()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scrapbook');
};
