import jwt from 'jsonwebtoken';

// Function to generate a signed JWT with a 30-day expiration
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export default generateToken;