/**
 *
 * Usage:
 * 
 * ````
 * res.emailAddressInUse();
 * ```
 */

module.exports = function logInSuccessfull(user) {

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;
  var req = this.req;
  console.log(user);

  return res.send(209, {message: 'Welcome home master.', token: sailsTokenAuth.issueToken(user.id), user: user}) ;

};