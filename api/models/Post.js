/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  	tableName: 'Posts',
  	connection: 'mongodb',
  	autoPK: true,

	attributes: {
		Title: {
			type: 'string',
  			required: true
		},
		Text: {
			type: 'string',
  			required: true
		},
		Tags: {
			type: 'array',
			required: true
		},
		Pictures: {
		},
		UserPseudo: {
			type: 'string'//,
			//required: true TODO when user handling is fully done
		},
		UserAvatarUrl: {
			type: 'string'
		},
		Report: {
			type: 'integer'
		},
		Comments: {
			type: 'array'
		}

	}

};

