exports.up = function(knex, Promise) {
    return knex.schema.table('accommodations', function(t) {
        t.string('phoneNumber').nullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('accommodations', function(t) {
        t.dropColumn('phoneNumber');
    });
};
