const { ipcRenderer } = require("electron");

// ---------------------------------------------------------
// Variables
const level = 0,
	msgElementId = "decrypted-msg",
	passElementId = "pass",
	fileUploadId = "file-up",
	fileNameId = "file-name",
	previewId = "preview",
	msgElement = document.getElementById(msgElementId),
	passElement = document.getElementById(passElementId),
	fileUploadElement = document.getElementById(fileUploadId),
	fileNameElement = document.getElementById(fileNameId),
	previewElement = document.getElementById(previewId);

// ---------------------------------------------------------
// Event Listeners
fileUploadElement.addEventListener("change", fileUploadHandler, false);

const btnDecrypt = document.getElementById("btn-decrypt");
btnDecrypt.addEventListener("click", decryptImage);

const btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", resetAll);

// ---------------------------------------------------------
function fileUploadHandler(e) {
	let file = e.target.files[0];
	if (file) {
		let reader = new FileReader();
		reader.onload = function (e) {
			let img = new Image();
			img.onload = function () {
				previewElement.width = img.width;
				previewElement.height = img.height;
				previewElement.getContext("2d").drawImage(img, 0, 0);
			};
			img.src = e.target.result;
		};
		reader.readAsDataURL(file);

		btnDecrypt.disabled = false;
		fileNameElement.textContent = file.name;
	} else {
		btnDecrypt.disabled = true;
	}
}

function resetAll() {
	// reset img after
	previewElement.width = 0;
	previewElement.height = 0;

	// reset and other input
	fileUploadElement.value = "";
	fileNameElement.textContent = "No file uploaded";
	msgElement.value = "Decrypted message will appear here.";
	passElement.value = "";
	btnDecrypt.disabled = true;
}

function decryptImage() {
	function readFunc() {
		let pass = passElement.value;
		let msg = readMsgFromCanvas("canvas", pass, level);
		msg = msg.split("&").join("&amp;");
		msg = msg.split(" ").join("&nbsp;");
		msg = msg.split("<").join("&lt;");
		msg = msg.split(">").join("&gt;");
		msg = msg.replace(/(?:\r\n|\r|\n)/g, "<br />");
		msgElement.innerHTML = msg;
	}

	loadIMGtoCanvas(fileUploadId, "canvas", readFunc, 500);
}

// ---------------------------------------------------------
