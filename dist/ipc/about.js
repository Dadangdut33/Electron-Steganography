"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var icon_1 = require("./icon");
electron_1.ipcMain.on("update-available", function (event, arg) {
    var updateNotif = new electron_1.Notification({
        title: "Update Available!",
        body: "A new update (".concat(arg, ") is available. Click here to download it."),
        icon: icon_1.iconPath
    });
    updateNotif.show();
    updateNotif.on("click", function () {
        electron_1.shell.openExternal("https://github.com/Dadangdut33/Electron-Steganography/releases/latest");
    });
    event.returnValue = "ok";
});
electron_1.ipcMain.on("update-not-available", function (event, arg) {
    var updateNotif = new electron_1.Notification({
        title: "No Update Available!",
        body: "You are using the latest version (".concat(arg, ")."),
        icon: icon_1.iconPath
    });
    updateNotif.show();
    event.returnValue = "ok";
});
//# sourceMappingURL=about.js.map