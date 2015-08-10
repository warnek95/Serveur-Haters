/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

module.exports = {
	/**
	 * Log in the website.
	 */

	logIn: function(req, res) {
		User.findOne({"Email": req.param('Email')},function (err, user) {
			if (err) {
				return res.negotiate(err);
			}

			if (!user) {
				return res.emailOrPasswordInvalid();
			}
			
			if (user) {
				var Passwords = require('machinepack-passwords');
				// Compare a plaintext password attempt against an already-encrypted version.
				Passwords.checkPassword({
					passwordAttempt: req.param('Password'),
					encryptedPassword: user.Password
				}).exec({
					// An unexpected error occurred.
					error: function (err){
						return res.negotiate(err);
					},
					// Password attempt does not match already-encrypted version
					incorrect: function (){
					  	return res.emailOrPasswordInvalid();
					},
					// OK.
					success: function (){
						// req.session.authenticated = true;
						// req.session.User = user;
						// console.log(user);
						User.update({id: user.id},{online: 1})
						.exec(function (err, user) {
							return res.logInSuccessfull(user[0]);
						})
					},
				}); 
			}
		});
	},
	logOut: function(req, res, next) {
		User.update({id: req.param('userId')},{online: 0})
		.exec(function (err, user) {
			return res.logOutSuccessfull();
		})
	}
};

