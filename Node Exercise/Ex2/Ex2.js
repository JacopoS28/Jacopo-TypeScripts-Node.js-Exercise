//Explore with the Node.js REPL

// Import the crypto module
const crypto = require('crypto');

// List the methods provided by the crypto module
console.log(Object.keys(crypto));

// Generate a random ID using the randomBytes method
const randomBytes = crypto.randomBytes(16).toString('hex');
console.log('Random ID:', randomBytes);
