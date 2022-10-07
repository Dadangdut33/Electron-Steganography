const { ipcRenderer } = require("electron");

console.log("s");
// test send ipc
ipcRenderer.send("test", "ini pesan");

// ---------------------------------------------------------
// Variables
const level = 0,
	canvasElementId = "canvas",
	msgElementId = "msg",
	passElementId = "pass",
	resultElementId = "result",
	canvasElement = document.getElementById(canvasElementId),
	msgElement = document.getElementById(msgElementId),
	passElement = document.getElementById(passElementId),
	resultElement = document.getElementById(resultElementId);

// ---------------------------------------------------------
// STIL BASIC IDEA
// Methods
const readSecret = () => {
	let pass = passElement.value;
	let msgGet = readMsgFromCanvas(canvasElementId, pass, level);

	if (msgGet) {
		ipcRenderer.send("status", { sucess: true, msg: msgGet });
		resultElement.innerHTML = msgGet;
	} else {
		ipcRenderer.send("status", { sucess: fail, msg: msgGet });
		resultElement.innerHTML = "Failed to get message";
	}
};

const writeSecret = () => {
	let msg = msgElement.value,
		pass = passElement.value;

	if (msg && pass) {
		writeMsgToCanvas(canvasElementId, msg, pass, level);
		ipcRenderer.send("status", { sucess: true, msg: "Message written to canvas" });
	} else {
		ipcRenderer.send("status", { sucess: fail, msg: "Message or password is empty" });
	}
};

const downloadCanvas = () => {
	let canvas = document.getElementById(canvasElementId);

	let dataURL = canvas.toDataURL("image/png");
	let a = document.createElement("a");
	a.href = dataURL;
	a.download = "canvas.png";
	a.click();

	ipcRenderer.send("status", { sucess: true, msg: "Canvas downloaded" });

	a.remove();
};

// ---------------------------------------------------------
