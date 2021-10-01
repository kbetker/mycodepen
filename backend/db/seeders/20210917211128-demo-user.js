'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'demo user',
        hashedPassword: bcrypt.hashSync('password'),
      },


      {
        email: faker.internet.email(),
        username: 'Bruenor Battlehammer',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },


      {
        email: "kevin@fakeemail.com",
        username: 'Kevin Betker',
        is_admin: true,
        hashedPassword: bcrypt.hashSync("ne14dnd"),
      },

      {
        email: faker.internet.email(),
        username: 'Larry Berry Terry',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },


    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['demo user', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
