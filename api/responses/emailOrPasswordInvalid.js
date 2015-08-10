/**
 *
 * Usage:
 * 
 * ````
 * res.emailAddressInUse();
 * ```
 */

module.exports = function emailOrPasswordInvalid() {

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;

  return res.send(410, 'Email or Password is invalid.');

};