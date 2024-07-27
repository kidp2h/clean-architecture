const config = require('./jest.config');

module.exports = {
  ...config,

  testRegex: '.e2e-spec.ts$',
};
