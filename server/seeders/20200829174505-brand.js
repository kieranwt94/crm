module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Brands', [
      {
        name: '1st Formations',
        colour: '#FFB525',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'Rapid Formations',
        colour: '#16AAE2',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'Quality Company Formations',
        colour: '#448288',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        name: 'Blue Square Offices',
        colour: '#006B9E',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Brands', null, {});
  }
};