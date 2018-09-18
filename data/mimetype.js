var path = require("path");
var mimeList = require("../data/mimetype.json");

exports.getMimeTypeFromFile = function(filePath) {
	// Pull MimeType from JSON by passing in the string index (file extension serves as key).
	return mimeList[path.extname(filePath)];
}