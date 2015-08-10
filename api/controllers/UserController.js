/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Gravatar = require('machinepack-gravatar');


module.exports = {

	/**
	 * Create a user account.
	 */

	create: function (req, res, next) {
		console.log(req.host);
		console.log(req.path);
		var Passwords = require('machinepack-passwords');
		// Encrypt a string using the BCrypt algorithm.
		Passwords.encryptPassword({
			password: req.param('Password'),
		}).exec({
			// An unexpected error occurred.
			error: function (err){
			 return res.negotiate(err);
			},
			// OK.
			success: function (encryptedPassword){
				// Build the URL of a gravatar image for a particular email address.
				Gravatar.getImageUrl({
					emailAddress: req.param('Email')
				}).exec({
					// An unexpected error occurred.
					error: function (err){
			 			return res.negotiate(err);
					},
					// OK.
					success: function (gravatarUrl){
						User.create({
							Pseudo: req.param('Pseudo'),
							Sex: req.param('Sex'),
							Email: req.param('Email'),
							Password: encryptedPassword,
							UpdatedAt: new Date(),
							AvatarUrl: gravatarUrl,
							Voted: [],
							Subscriptions: [],
							Tags: [],
							Followers: 0,
							Posts: 0,
						}, function userCreated (err, user){
							console.log('%j',user);
							if (err) return next(err);
							User.update({id: user.id},{online: 1})
							.exec(function (err, user) {
								return res.logInSuccessfull(user[0]);
							})
						});
					},
				});
			},
		}); 
	},
};


// db.Users.find( { $or: [ { "Pseudo": "alha" }, { "Email": "ddd@ddd.ddd" } ] } )