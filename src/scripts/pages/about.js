const { ipcRenderer } = require("electron");
// ============================================================
let curVerEl = document.getElementById("ver-id");
let curVerVar = ipcRenderer.sendSync("get-version");
curVerEl.innerText = curVerVar;

let checkVer = document.getElementById("check-ver");
checkVer.addEventListener("click", function () {
	// check latest version from github
	fetch("https://api.github.com/repos/Dadangdut33/Electron-Steganography/releases/latest")
		.then((response) => response.json())
		.then((data) => {
			let latestVer = data.tag_name;
			if (latestVer > curVerVar) {
				ipcRenderer.send("update-available", latestVer);
			} else {
				ipcRenderer.send("update-not-available", curVerVar);
			}
		});
});
