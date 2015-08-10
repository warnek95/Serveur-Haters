/**
* PostsDAO.js
*
* @description :: TODO: You might write a short summary of how this DAO works and what it represents here.
*/
module.exports = {
	arrayingPicturesPath: function(pictures, next){
		var picturesArray = new Array();
		for (var i = pictures.length - 1; i >= 0; i--) {
			picturesArray.push(pictures[i].fd.replace('/home/dalmace/Documents/hmm/sailsServer/hatersServ/assets/',''));
		};
		next(picturesArray);
	}
};

