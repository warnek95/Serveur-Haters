/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var shortid = require('shortid');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
	create: function (req, res, next) {
		console.log(req.params.all());
		console.log(req.host);
		console.log(req.path);
		var Id = shortid.generate();
		var now = new Date();
		Post.findOne(req.param('postId')).exec(function(err,post) {
			post.Comments.push({
				User: { 
					Pseudo: req.param('COMMENT_USER_PSEUDO'), 
					Avatar: req.param('COMMENT_USER_AVATAR')
				},
				Text: req.param('Text'),
				CreatedAt: now,
				Report: 0,
				Id: Id
			});
			post.save(function(err) {
				res.json(post);
			});
		})
	},
	upVoteComment: function(req, res, next) {
		User.findOne(req.param('userId')).exec(function(err,user) {
			if (user.Voted.indexOf(req.param('commentId')) > -1) {
				res.json('nope');
			} else{
				user.Voted.push(
					req.param('commentId')
				)
				user.save(function(err) {
					console.log(user);
					Post.native(function(err,collection) {
						collection.update(
						   {_id: new ObjectId(req.param('postId')), "Comments.Id": req.param('commentId')},
						   { $inc: { "Comments.$.Report": 1 } }
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