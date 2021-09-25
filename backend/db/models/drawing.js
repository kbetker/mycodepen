'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drawing = sequelize.define('Drawing', {
    owner_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    canvas_array: DataTypes.STRING
  }, {});
  Drawing.associate = function(models) {
   Drawing.belongsTo(models.User, { foreignKey: "owner_id" })
  };
  return Drawing;
};
