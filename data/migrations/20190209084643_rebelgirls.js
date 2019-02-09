exports.up = function(knex, Promise) {
    return knex.schema.createTable('rebelgirls', table => {
        table.increments();
        table.string('name').notNullable().unique();
        table.string('occupation').notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('rebelgirls');
  };
