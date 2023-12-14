const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('test-paginate', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize