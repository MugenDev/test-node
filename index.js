var http = require("http");
var fs = require("fs");
var mime = require("./data/mimetype");

var server = http.createServer((req, res) => {
	// __dirname = /Users/{username}/{projectdirectory}/{projectfolder}
	// req.url = /filename.ext
	var filePath = (req.url == "/") ? __dirname + req.url + "html/index.html" : __dirname + req.url;
	console.log("Path:", filePath);

	/*
	// Older working equivalent. Keep for reference.
	fs.readFile(filePath, function (err, htmlRes) {
		if (err) {
			res.writeHead(404);
			res.write('Contents you are looking are Not Found');
		} else {
			res.writeHead(200, { "Content-Type": mime.getMimeTypeFromFile(filePath) });
			res.write(htmlRes);
		}
		res.end();
	});
	*/

	
	fs.exists(filePath, (exists) => {
		if (!exists) {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.write("Error 404: Resource not found.");
			res.end();
			return;
		}

		res.writeHead(200, { "Content-Type": mime.getMimeTypeFromFile(filePath) });
		fs.createReadStream(filePath).pipe(res);
	});
	
});

server.listen(3000, function () {
	console.log("Port is running on 3000.");
});