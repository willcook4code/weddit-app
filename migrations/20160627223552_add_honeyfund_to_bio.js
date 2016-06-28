exports.up = function(knex, Promise) {
    return knex.schema.table('bios', function(t) {
        t.string('honeyfund').nullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('bios', function(t) {
        t.dropColumn('honeyfund');
    });
};
