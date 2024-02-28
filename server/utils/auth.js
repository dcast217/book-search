const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const secret = 'mysecretsshhhhh';

const authMiddleware = (context) => {
  const token = context.req.headers.authorization || '';

  if (!token) {
    throw new AuthenticationError('You must be logged in.');
  }

  try {
    const decoded = jwt.verify(token, secret);
    context.user = decoded;
  } catch (error) {
    throw new AuthenticationError('Invalid token.');
  }
};

module.exports = authMiddleware;