/**
 * TagController
 *
 * @description :: Server-side logic for managing Tags
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function(req, res, next) {
		Tag.find()
		.sort({ Wording: 'asc' })
		.exec(function(err, tags) {
		  if (err) return next(err);
		  res.send(tags);
		});
	},
	findPop: function(req, res, next) {
		Tag.find()
		.sort({ Used: 'desc' })
		.exec(function(err, tags) {
		  if (err) return next(err);
		  res.send(tags);
		});
	},
};

