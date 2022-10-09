var ipcRenderer = require("electron").ipcRenderer;
// ---------------------------------------------------------
// Variables
var imgBeforeId = "img-before", imgAfterId = "img-after", msgElementId = "msg", passElementId = "pass", fileUploadId = "file-up", fileNameId = "file-name", proggressId = "proggress", imgBefore = document.getElementById(imgBeforeId), imgAfter = document.getElementById(imgAfterId), msgElement = document.getElementById(msgElementId), passElement = document.getElementById(passElementId), fileUploadElement = document.getElementById(fileUploadId), fileNameElement = document.getElementById(fileNameId), proggress = document.getElementById(proggressId);
var downloadLinkCache, selectedImg;
// ---------------------------------------------------------
// Event Listeners
msgElement.addEventListener("input", msgElHandler);
fileUploadElement.addEventListener("change", fileUploadHandler, false);
var btnEncrypt = document.getElementById("btn-encrypt");
btnEncrypt.addEventListener("click", writeSecret);
var btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", resetAll);
var btnSave = document.getElementById("btn-save");
btnSave.addEventListener("click", saveCanvas);
// ---------------------------------------------------------
function msgElHandler(e) {
    var msg = e.target.value;
    if (msg.length > 0 && fileUploadElement.value.length > 0) {
        btnEncrypt.disabled = false;
    }
    else {
        btnEncrypt.disabled = true;
    }
}
function fileUploadHandler(e) {
    var file = e.target.files[0];
    if (file) {
        selectedImg = file;
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
                imgBefore.width = img.width;
                imgBefore.height = img.height;
                imgBefore.getContext("2d").drawImage(img, 0, 0);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        if (msgElement.value.length > 0)
            btnEncrypt.disabled = false;
        fileNameElement.textContent = file.name;
    }
    else {
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
    var msg = msgElement.value, pass = passElement.value;
    if (writeMsgToCanvas_base("canvas", msg, pass, false, 1) === true) {
        btnSave.disabled = false;
        var myCanvas = document.getElementById("canvas"), image = myCanvas.toDataURL("image/png");
        downloadLinkCache = image;
        imgAfter.width = myCanvas.width;
        imgAfter.height = myCanvas.height;
        imgAfter.getContext("2d").drawImage(myCanvas, 0, 0);
    }
}
function writeSecret() {
    proggress.removeAttribute("value");
    var msg = msgElement.value;
    if (msg.length > 0) {
        loadIMGtoCanvas(fileUploadId, "canvas", writefunc, 500);
        ipcRenderer.send("status-notif", { msg: "Message written to canvas" });
    }
    else {
        ipcRenderer.send("status-notif", { status: "Error!", msg: "Message must be provided" });
    }
    // timeout for proggress bar
    setTimeout(function () {
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
    var now = new Date();
    var link = document.createElement("a");
    link.download = "encrypted ".concat(now.getTime(), ".png");
    link.href = downloadLinkCache;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
// ---------------------------------------------------------
//# sourceMappingURL=encrypt.js.map