// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['ngTest/e2e/**/*.js'],
  baseUrl: 'http://localhost:3000/#/',
  framework: 'jasmine'
}