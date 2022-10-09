"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var icon_1 = require("./icon");
electron_1.ipcMain.on("get-version", function (event, arg) {
    event.returnValue = electron_1.app.getVersion();
});
electron_1.ipcMain.on("status-notif", function (event, arg) {
    new electron_1.Notification({
        title: "Status",
        body: arg.msg,
        icon: icon_1.iconPath
    }).show();
});
//# sourceMappingURL=main.js.map