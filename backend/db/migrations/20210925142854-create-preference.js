'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Preferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Users"}
      },
      saved_colors: {
        allowNull: false,
        type: Sequelize.TEXT,
        default: "{ \"1\": \"rgba(0, 0, 0, 1)\", \"2\": \"rgba(0, 0, 0, 1)\", \"3\": \"rgba(0, 0, 0, 1)\", \"4\": \"rgba(255, 255, 255, 1)\", \"5\": \"rgba(255, 0, 0, 1)\", \"6\": \"rgba(0, 255, 0, 1)\", \"7\": \"rgba(0, 0, 255, 1)\", \"8\": \"rgba(255, 255, 0, 1)\", \"9\": \"rgba(255, 0, 255, 1)\", \"0\": \"rgba(0, 255, 255, 1)\"}"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Preferences');
  }
};
