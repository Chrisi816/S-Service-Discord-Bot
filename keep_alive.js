const http = require("http");

http.createServer(function (req, res) {
	res.write("I'm alive");
	res.end();
}).listen(2080);
