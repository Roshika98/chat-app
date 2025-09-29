const net = require("net");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
	console.log("New client connected", socket.remoteAddress, ":", socket.remotePort);
	const clientId = clients.length + 1;
	clients.push({ id: clientId.toString(), socket });
	socket.write(`id-${clientId}`);
	socket.on("data", (data) => {
		const senderId = data.subarray(0, 2).toString("utf-8");
		const message = data.subarray().toString("utf-8");
		// console.log(data.toString("utf-8"));
		clients.forEach((client) => {
			client.socket.write(`> User ${senderId}: ${message}`);
		});
	});
});

server.listen(3000, "127.0.0.1", () => {
	console.log(`Server is listening on port ${server.address().port}...`);
});
