/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  tableName: 'Posts',
  connection: 'mongodb',
  attributes: {
  	COMMENT_USER_PSEUDO: {
  		type: 'string',
		required: true
	},
	COMMENT_USER_AVATAR: {
	},
	Text: {
		type: 'string',
		required: true
	},
	CreatedAt: {
		type: 'datetime'
	},
	Report: {
		type: 'integer'
	},
	Id: {
	},
  }
};

