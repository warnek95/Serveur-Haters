var jwt = require('jsonwebtoken');

module.exports.issueToken = function(payload) {
  var token = jwt.sign(payload, sails.config.secret, { expiresInMinutes: 60*5 });
  return token;
};

module.exports.verifyToken = function(token, verified) {
  return jwt.verify(token, sails.config.secret, {}, verified);
};