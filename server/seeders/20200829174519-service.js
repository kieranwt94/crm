module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Services', [
      {
        name: 'Address Service',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Apostilled Documents',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Business Telephone Number',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Call Answering',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Certificate of Good Standing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Company Dissolution',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Company Name Change',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Confirmation Statement',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Director Appointment Resignation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dormant Company Accounts',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Full Company Secretary',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Issue of Shares',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Transfer of Shares',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Services', null, {});
  }
};