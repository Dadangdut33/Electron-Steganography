var ipcRenderer = require("electron").ipcRenderer;
// ============================================================
var curVerEl = document.getElementById("ver-id");
var curVerVar = ipcRenderer.sendSync("get-version");
curVerEl.innerText = curVerVar;
var checkVer = document.getElementById("check-ver");
checkVer.addEventListener("click", function () {
    // check latest version from github
    fetch("https://api.github.com/repos/Dadangdut33/Electron-Steganography/releases/latest")
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var latestVer = data.tag_name;
        if (latestVer > curVerVar) {
            ipcRenderer.send("update-available", latestVer);
        }
        else {
            ipcRenderer.send("update-not-available", curVerVar);
        }
    });
});
//# sourceMappingURL=about.js.map