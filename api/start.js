// eslint-disable-next-line no-global-assign
require = require('esm')(module);
const { WalletServer } = require('./server.js');

new WalletServer().start();
