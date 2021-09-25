'use strict';
module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define('Preference', {
    owner_id: DataTypes.INTEGER,
    saved_colors: DataTypes.STRING
  }, {});
  Preference.associate = function(models) {
    Preference.belongsTo(models.User, { foreignKey: "owner_id" })
  };
  return Preference;
};
