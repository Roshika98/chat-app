const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const ask = async () => {
	const message = await rl.question("Enter message to send to server > ");
	client.write(message);
};

const clearLine = async () => {
	return new Promise((resolve) => {
		process.stdout.clearLine(0, () => {
			resolve();
		});
	});
};

const moveCursor = async (dx, dy) => {
	return new Promise((resolve) => {
		process.stdout.moveCursor(dx, dy, () => {
			resolve();
		});
	});
};

const client = net.createConnection({ port: 3000, host: "127.0.0.1" }, async () => {
	console.log("Connected to server");
	await ask();
});

client.on("data", async (data) => {
	await moveCursor(0, -1);
	await clearLine();
	console.log(data.toString("utf-8"));
	await ask();
});

client.on("error", (err) => {
	console.error("Connection error:", err);
});

client.on("close", (data) => {
	console.log("Connection closed", data);
});

client.on("end", () => {
	console.log("finished reading data from server");
});