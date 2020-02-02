require('dotenv').config();

const {
  PORT,
  MONGODB_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  secretOrKey,
} = process.env;

module.exports = {
  PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGODB_URL,
  secretOrKey,
};
