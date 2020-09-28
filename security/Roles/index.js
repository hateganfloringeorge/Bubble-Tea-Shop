/* eslint-disable max-len */
const {
  ServerError,
} = require('../../errors');

const authorizeRoles = (...roles) => (req, res, next) => {
  for (let i = 0; i < roles.length; i += 1) {
    if (req.state.decoded.userRole === roles[i]) { // observati cum in req.state exista obiectul decoded trimis la middlewareul anterior, de autorizare token
      return next();
    }
  }
  throw new ServerError('Nu sunteti autorizat sa accesati resursa!', 401);
};

module.exports = {
  authorizeRoles,
};
