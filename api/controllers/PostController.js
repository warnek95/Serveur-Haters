/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;

module.exports = {
	create: function (req, res, next) {
		console.log(req.params.all());
		console.log(req.host);
		console.log(req.path);
		var Tags = new Array();
		var Pictures = new Array();
		if (typeof(req.param('Tags')) == 'string') {
			Tags.push(req.param('Tags'));
		} else{
			Tags = req.param('Tags');
		};
		var uploadPath = '../../assets/images';
		req.file('Pictures').upload({ dirname: uploadPath },function picturesUploaded(err, pictures) {
			if (err) return next(err);
			PostDAO.arrayingPicturesPath(pictures, function picturesInserted (picturesArray){
				console.log(Tags);
				console.log(picturesArray);
				//res.send('/');
				//res.sendfile(filepath);
				Post.create({
					User: { 
						Pseudo: req.param('COMMENT_USER_PSEUDO'), 
						Avatar: req.param('COMMENT_USER_AVATAR')
					},
					Title: req.params.all().Title,
					Text: req.params.all().Text,
					Tags: Tags,
					Pictures: picturesArray,
					Report: 0,
					Comments: []
				}, function (err, post) {
					Tag.native(function(err,collection) {
						collection.update(
						   {Wording: { $in: Tags}},
						   { $inc: { Used: 1 } }
						,function(err, results) {
							console.log(err);
							console.log(results);
							res.json('yup');
						})
					})
				})
			})
		})
	},
	findSubLast: function(req, res, next) {
		Post.find({"User.Pseudo": { $in: req.param('subscriptions') } })
		.limit(20)
		.sort({ createdAt: 'desc' })
		.exec(function(err, posts) {
		  if (err) return next(err);
		  res.send(posts);
		});
	},
	findLast: function(req, res, next) {
		Post.find()
		.limit(20)
		.sort({ createdAt: 'desc' })
		.exec(function(err, posts) {
		  if (err) return next(err);
		  res.send(posts);
		});
	},
	find: function(req, res, next) {
		Post.native(function(err,collection) {
			collection.findOne(
			   {_id: new ObjectId(req.query.postId)}
			,function(err, post) {
				res.json(post);
			})
		})
	},
	upVotePost: function(req, res, next) {
		User.findOne(req.param('userId')).exec(function(err,user) {
			if (user.Voted.indexOf(req.param('postId')) > -1) {
				res.json('nope');
			} else{
				user.Voted.push(
					req.param('postId')
				)
				user.save(function(err) {
					console.log(user);
					console.log('ObjectId(' + '"' + req.param('postId') + '"' + ')');
					Post.native(function(err,collection) {
						collection.update(
						   {_id: new ObjectId(req.param('postId'))},
						   { $inc: { Report: 1 } }
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

