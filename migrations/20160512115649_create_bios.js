exports.up = function(knex, Promise) {
	return knex.schema.createTable('bios', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('registrant1').notNull();
		t.string('registrant2').notNull();
		t.string('pic').notNull();
		t.text('story').notNull();
		t.string('registry1').nullable();
		t.string('registry2').nullable();

		t.integer('userId')
			.unsigned()
			.notNull()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('bios');
};
