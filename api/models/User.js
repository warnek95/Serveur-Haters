/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'Users',
  	connection: 'mongodb',

	attributes: {
		Pseudo: {
			type: 'string',
			required: true
		},
		Password: {
			type: 'string',
			required: true
		},
		Sex: {
			type: 'string'
		},
		Email: {
			type: 'string',
			required: true
		},
		AvatarUrl: {
			type: 'string'
		}
	}
};

