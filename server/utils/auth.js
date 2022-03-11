const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  signToken: function ({ email, githubUser, _id }) {
    const payload = { email, githubUser, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
