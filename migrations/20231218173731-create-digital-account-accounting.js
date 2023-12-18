'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('digital_account_accountings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.STRING
      },
      event_name: {
        type: Sequelize.STRING
      },
      account_credt: {
        type: Sequelize.STRING
      },
      account_debt: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('digital_account_accountings');
  }
};