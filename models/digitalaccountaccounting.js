'use strict';
const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const DigitalAccountAccounting = sequelize.define("DigitalAccountAccounting", {
  eventId: DataTypes.STRING,
  eventName: DataTypes.STRING,
  accountCredt: DataTypes.STRING,
  accountDebt: DataTypes.STRING,
  amount: DataTypes.INTEGER,
  type: DataTypes.STRING,
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  underscored: true
});

module.exports = DigitalAccountAccounting