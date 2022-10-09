var ipcRenderer = require("electron").ipcRenderer;
// ---------------------------------------------------------
// Variables
var msgElementId = "decrypted-msg", passElementId = "pass", fileUploadId = "file-up", fileNameId = "file-name", previewId = "preview", proggressId = "proggress", msgElement = document.getElementById(msgElementId), passElement = document.getElementById(passElementId), fileUploadElement = document.getElementById(fileUploadId), fileNameElement = document.getElementById(fileNameId), previewElement = document.getElementById(previewId), proggress = document.getElementById(proggressId);
// ---------------------------------------------------------
// Event Listeners
fileUploadElement.addEventListener("change", fileUploadHandler, false);
var btnDecrypt = document.getElementById("btn-decrypt");
btnDecrypt.addEventListener("click", decryptImage);
var btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", resetAll);
// ---------------------------------------------------------
function fileUploadHandler(e) {
    var file = e.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
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
    }
    else {
        btnDecrypt.disabled = true;
        fileNameElement.textContent = "No file uploaded";
        // reset img after
        previewElement.width = 0;
        previewElement.height = 0;
    }
}
function resetAll() {
    // reset img after
    previewElement.width = 0;
    previewElement.height = 0;
    // reset and other input
    fileUploadElement.value = "";
    fileNameElement.textContent = "No file uploaded";
    msgElement.innerHTML = "<em>Decrypted message will appear here.</em>";
    passElement.value = "";
    btnDecrypt.disabled = true;
}
function decryptImage() {
    ipcRenderer.send("status-notif", { msg: "Decrypting..." });
    proggress.removeAttribute("value");
    var pass = passElement.value;
    check_msg = readMsgFromCanvas_base(previewId, pass.trim(), false, 1);
    if (check_msg[0] === true) {
        msgElement.innerHTML = check_msg[1];
        ipcRenderer.send("status-notif", { msg: "Message Decrypted successfully!" });
    }
    else {
        msgElement.innerHTML = "Wrong picture/password";
    }
    // timeout for proggress bar
    setTimeout(function () {
        proggress.setAttribute("value", "0");
    }, 1500);
}
// ---------------------------------------------------------
//# sourceMappingURL=decrypt.js.map