/**
 *
 * Usage:
 * 
 * ````
 * res.emailAddressInUse();
 * ```
 */

module.exports = function logOutSuccessfull(user) {

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;
  var req = this.req;

  return res.send(209, {message: 'Bye master.'}) ;

};