const bcryptjs = require('bcryptjs');

// va trebui sa folositi hash atunci cand stocati parola in baza de date, la register
const hash = async (plainTextPassword) => {
  const salt = await bcryptjs.genSalt(5);
  const hasher = await bcryptjs.hash(plainTextPassword, salt);
  return hasher;
};

// va trebui sa folositi compare atunci cand primiti cerere de autentificare
const compare = async (plainTextPassword, hashedPassword) => {
  const isOk = await bcryptjs.compare(plainTextPassword, hashedPassword);
  return isOk;
};

module.exports = {
  hash,
  compare,
};
