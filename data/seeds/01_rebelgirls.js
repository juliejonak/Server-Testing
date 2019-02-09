
exports.seed = function(knex, Promise) {
  return knex('rebelgirls').truncate()
    .then(function () {
      return knex('rebelgirls').insert([
        {
            name: `Grace O'Malley`,
            occupation: "Pirate"
        },
    
        {
            name: "Yusra Mardini",
            occupation: "Swimmer"
        },
    
        {
            name: "Billie Jean King",
            occupation: "Tennis Player"
        },
    
        {
            name: "Wengari Maathai",
            occupation: "Biologist"
        },
    ]);
    });
};
