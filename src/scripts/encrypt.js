const { ipcRenderer } = require("electron");

// ---------------------------------------------------------
// Variables
const level = 0,
	imgBeforeId = "img-before",
	imgAfterId = "img-after",
	msgElementId = "msg",
	passElementId = "pass",
	fileUploadId = "file-up",
	fileNameId = "file-name",
	imgBefore = document.getElementById(imgBeforeId),
	imgAfter = document.getElementById(imgAfterId),
	msgElement = document.getElementById(msgElementId),
	passElement = document.getElementById(passElementId),
	fileUploadElement = document.getElementById(fileUploadId),
	fileNameElement = document.getElementById(fileNameId);

let downloadLinkCache;

// ---------------------------------------------------------
// Event Listeners
msgElement.addEventListener("input", msgElHandler);
fileUploadElement.addEventListener("change", fileUploadHandler, false);

const btnEncrypt = document.getElementById("btn-encrypt");
btnEncrypt.addEventListener("click", writeSecret);

const btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", resetAll);

const btnSave = document.getElementById("btn-save");
btnSave.addEventListener("click", saveCanvas);

// ---------------------------------------------------------
function msgElHandler(e) {
	let msg = e.target.value;
	if (msg.length > 0 && fileUploadElement.value.length > 0) {
		btnEncrypt.disabled = false;
	} else {
		btnEncrypt.disabled = true;
	}
}

function fileUploadHandler(e) {
	let file = e.target.files[0];
	if (file) {
		let reader = new FileReader();
		reader.onload = function (e) {
			let img = new Image();
			img.onload = function () {
				imgBefore.width = img.width;
				imgBefore.height = img.height;
				imgBefore.getContext("2d").drawImage(img, 0, 0);
			};
			img.src = e.target.result;
		};
		reader.readAsDataURL(file);

		if (msgElement.value.length > 0) btnEncrypt.disabled = false;
		fileNameElement.textContent = file.name;
	}
}

function writefunc() {
	let msg = msgElement.value,
		pass = passElement.value;
	if (writeMsgToCanvas_base("canvas", msg, pass, false, 1) === true) {
		btnSave.disabled = false;

		let myCanvas = document.getElementById("canvas"),
			image = myCanvas.toDataURL("image/png");
		downloadLinkCache = image;

		imgAfter.width = myCanvas.width;
		imgAfter.height = myCanvas.height;
		imgAfter.getContext("2d").drawImage(myCanvas, 0, 0);
	}
}

function writeSecret() {
	let msg = msgElement.value;

	if (msg.length > 0) {
		loadIMGtoCanvas(fileUploadId, "canvas", writefunc, 500);

		ipcRenderer.send("status-notif", { msg: "Message written to canvas" });
	} else {
		ipcRenderer.send("status-notif", { status: "Error!", msg: "Message must be provided" });
	}
}

function resetAll() {
	// reset img before
	imgBefore.width = 0;
	imgBefore.height = 0;

	// reset img after
	imgAfter.width = 0;
	imgAfter.height = 0;

	// reset and other input
	fileUploadElement.value = "";
	fileNameElement.textContent = "No file uploaded";
	msgElement.value = "";
	passElement.value = "";
	btnEncrypt.disabled = true;
	btnSave.disabled = true;
}

function saveCanvas() {
	const now = new Date();

	let link = document.createElement("a");
	link.download = `encrypted ${now.getTime()}.jpg`;
	link.href = downloadLinkCache;

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
// ---------------------------------------------------------
