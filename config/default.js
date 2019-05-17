module.exports = {
  swagger: {
    description: 'Sample Node JS API',
    version: '1.0.0',
    title: 'Node JS API',
    termsOfService: 'http://swagger.io/terms/',
    contactEmail: 'rajat46100@gmail.com',
    host: 'localhost',
    port: 3000,
    basePath: '/api/v1',
    schemes: ['http']
  },
  mongo_url: 'mongodb://sa:thinksys123@10.101.10.92:32017/test_db?authSource=admin',
  //   mongo_url: 'mongodb://localhost:27017/test?authSource=admin',
  twilio: {
    accountSid: 'AC01a691a3b40b6ab468549c66d679831c',
    authToken: '4da184b6ef5bb6aeee9ed1053c4804d3'
  },
  jwt: {
    secretKey: 'someTestSecretKey'
  },
  otpTemplate: `OTP for login: {otp}`
};
