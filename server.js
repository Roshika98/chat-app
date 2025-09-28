const net = require("net");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
	console.log("New client connected", socket.remoteAddress, ":", socket.remotePort);
	clients.push(socket);

	socket.on("data", (data) => {
		// console.log(data.toString("utf-8"));
		clients.forEach((client) => {
			client.write(data);
		});
	});
});

server.listen(3000, "127.0.0.1", () => {
	console.log(`Server is listening on port ${server.address().port}...`);
});
