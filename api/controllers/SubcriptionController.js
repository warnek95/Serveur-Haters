/**
 * SubcriptionController
 *
 * @description :: Server-side logic for managing Subcriptions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	add: function(req, res, next) {
		User.findOne(req.param('userId')).exec(function(err,user) {
			if (user.Subscriptions.indexOf(req.param('providerPseudo')) > -1) {
				res.json('nope');
			} else{
				user.Subscriptions.push(
					req.param('providerPseudo')
				)
				user.save(function(err) {
					User.native(function(err,collection) {
						collection.update(
						   {Pseudo: req.param('providerPseudo')},
						   { $inc: { Followers: 1 } }
						,function(err, results) {
							console.log(err);
							console.log(results);
							res.json('yup');
						})
					})
					
				});
			}
		})
	},
};
