const net = require("net");

const server = net.createServer();

server.listen(3000, "127.0.0.1", () => {
	console.log(`Server is listening on port ${server.address().port}...`);
});
