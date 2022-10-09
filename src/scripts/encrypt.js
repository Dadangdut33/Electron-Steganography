const { ipcRenderer } = require("electron");

// ---------------------------------------------------------
// Variables
const imgBeforeId = "img-before",
	imgAfterId = "img-after",
	msgElementId = "msg",
	passElementId = "pass",
	fileUploadId = "file-up",
	fileNameId = "file-name",
	proggressId = "proggress",
	radioScaleOriId = "radio-scale-ori",
	radioScaledId = "radio-scaled",
	fieldScaleId = "field-scale",
	inputScaleId = "scale-input",
	imgBefore = document.getElementById(imgBeforeId),
	imgAfter = document.getElementById(imgAfterId),
	msgElement = document.getElementById(msgElementId),
	passElement = document.getElementById(passElementId),
	fileUploadElement = document.getElementById(fileUploadId),
	fileNameElement = document.getElementById(fileNameId),
	proggress = document.getElementById(proggressId),
	radioScaleOriElement = document.getElementById(radioScaleOriId),
	radioScaledElement = document.getElementById(radioScaledId),
	fieldScaleElement = document.getElementById(fieldScaleId),
	inputScaleElement = document.getElementById(inputScaleId);

let downloadLinkCache, selectedImgWidth;

// ---------------------------------------------------------
// Event Listeners
radioScaleOriElement.addEventListener("click", hideFieldScale);
radioScaledElement.addEventListener("click", showFieldScale);
msgElement.addEventListener("input", msgElHandler);
fileUploadElement.addEventListener("change", fileUploadHandler, false);

const btnEncrypt = document.getElementById("btn-encrypt");
btnEncrypt.addEventListener("click", writeSecret);

const btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", resetAll);

const btnSave = document.getElementById("btn-save");
btnSave.addEventListener("click", saveCanvas);

// ---------------------------------------------------------
function hideFieldScale() {
	fieldScaleElement.style.display = "none";
}

function showFieldScale() {
	fieldScaleElement.style.display = "block";
}

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
				selectedImgWidth = img.width;
			};
			img.src = e.target.result;
		};
		reader.readAsDataURL(file);

		if (msgElement.value.length > 0) btnEncrypt.disabled = false;
		fileNameElement.textContent = file.name;
	} else {
		// reset img before
		imgBefore.width = 0;
		imgBefore.height = 0;

		// reset and other input
		fileUploadElement.value = "";
		fileNameElement.textContent = "No file uploaded";
		btnEncrypt.disabled = true;
	}
}

function writefunc() {
	let msg = msgElement.value,
		pass = passElement.value;
	if (writeMsgToCanvas_base("canvas", msg.trim(), pass.trim(), false, 1) === true) {
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
	proggress.removeAttribute("value");
	let msg = msgElement.value;

	// check for scale input if checked
	if (radioScaledElement.checked) {
		let scale = parseInt(inputScaleElement.value);

		if (isNaN(scale) || scale < 1) {
			ipcRenderer.send("status-notif", { status: "Error!", msg: "Invalid number provided!" });
			proggress.setAttribute("value", "0");
			return;
		} else if (scale > selectedImgWidth) {
			// warn user with a dialog
			const x = confirm("Warning! Scale inputted is greater than image width. This might crash the app unless you have a powerfull PC. Do you want to continue?");
			if (x === false) {
				proggress.setAttribute("value", "0");
				return;
			}
		}
	}

	if (msg.length > 0) {
		ipcRenderer.send("status-notif", { msg: "Encrypting..." });
		if (radioScaleOriElement.checked) {
			loadIMGtoCanvas(fileUploadId, "canvas", writefunc);
		} else {
			loadIMGtoCanvas(fileUploadId, "canvas", writefunc, parseInt(inputScaleElement.value));
		}

		ipcRenderer.send("status-notif", { msg: "Message encrypted to image successfully!" });
	} else {
		ipcRenderer.send("status-notif", { status: "Error!", msg: "Message must be provided" });
	}

	// timeout for proggress bar
	setTimeout(() => {
		proggress.setAttribute("value", "0");
	}, 1500);
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
	link.download = `encrypted ${now.getTime()}.png`;
	link.href = downloadLinkCache;

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
// ---------------------------------------------------------
