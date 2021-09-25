'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Preferences', [
      {owner_id: 1, saved_colors: "{ \"1\": \"rgba(0, 0, 0, 1)\", \"2\": \"rgba(0, 0, 0, 1)\", \"3\": \"rgba(0, 0, 0, 1)\", \"4\": \"rgba(255, 255, 255, 1)\", \"5\": \"rgba(255, 0, 0, 1)\", \"6\": \"rgba(0, 255, 0, 1)\", \"7\": \"rgba(0, 0, 255, 1)\", \"8\": \"rgba(255, 255, 0, 1)\", \"9\": \"rgba(255, 0, 255, 1)\", \"0\": \"rgba(0, 255, 255, 1)\"}"},
      {owner_id: 2, saved_colors: "{ \"1\": \"rgba(0, 0, 0, 1)\", \"2\": \"rgba(0, 0, 0, 1)\", \"3\": \"rgba(0, 0, 0, 1)\", \"4\": \"rgba(255, 255, 255, 1)\", \"5\": \"rgba(255, 0, 0, 1)\", \"6\": \"rgba(0, 255, 0, 1)\", \"7\": \"rgba(0, 0, 255, 1)\", \"8\": \"rgba(255, 255, 0, 1)\", \"9\": \"rgba(255, 0, 255, 1)\", \"0\": \"rgba(0, 255, 255, 1)\"}"},
      {owner_id: 3, saved_colors: "{ \"1\": \"rgba(0, 0, 0, 1)\", \"2\": \"rgba(0, 0, 0, 1)\", \"3\": \"rgba(0, 0, 0, 1)\", \"4\": \"rgba(255, 255, 255, 1)\", \"5\": \"rgba(255, 0, 0, 1)\", \"6\": \"rgba(0, 255, 0, 1)\", \"7\": \"rgba(0, 0, 255, 1)\", \"8\": \"rgba(255, 255, 0, 1)\", \"9\": \"rgba(255, 0, 255, 1)\", \"0\": \"rgba(0, 255, 255, 1)\"}"},
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Preferences', null, {});
  }
};
