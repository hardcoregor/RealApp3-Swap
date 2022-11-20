require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
  },
  contracts_directory: './contract/',
  contracts_build_directory: './context/',
  compilers: {
    solc: {
      version: '0.6.6',
    },
  },
};
