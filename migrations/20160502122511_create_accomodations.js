exports.up = function(knex, Promise) {
	return knex.schema.createTable('accomodations', function(t) {
		t.increments('id').unsigned().primary();
		t.dateTime('createdAt').notNull();
		t.dateTime('updatedAt').nullable();
		t.dateTime('deletedAt').nullable();

		t.string('hotelName').notNull();
		t.string('hotelZip').notNull();
		t.string('hotelUrl').notNull();
		t.string('hotelPic').notNull();
		t.string('ofUser').notNull();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('accomodations');
};
