const net = require("net");
const readline = require("readline/promises");

let id;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "Enter message > ",
});

rl.on("line", async (line) => {
	client.write(`id-${id}-message-${line}`);
	await moveCursor(0, -1);
	await clearLine();
	// rl.prompt();
});

// const ask = async () => {
// 	const message = await rl.question("Enter message to send to server > ");
// 	client.write(message);
// 	// await cursorTo(0, 1);
// 	// await clearLine();
// };

const clearLine = async () => {
	return new Promise((resolve) => {
		process.stdout.clearLine(0, () => {
			resolve();
		});
	});
};

const cursorTo = async (dx, dy) => {
	return new Promise((resolve) => {
		process.stdout.cursorTo(dx, dy, () => {
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
	// await ask();
	rl.prompt();
});

client.on("data", async (data) => {
	await clearLine();
	await cursorTo(0, undefined);
	if (data.subarray(0, 2).toString("utf-8") == "id") {
		id = data.subarray(3).toString("utf-8");
		console.log("Your id is ", id, "\n");
	} else {
		console.log(data.toString("utf-8"));
		// await ask();
	}
	rl.prompt();
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