"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var icon_1 = require("./ipc/icon");
// ----------------------------
// Vars
var mainWindow = null;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    // eslint-disable-line global-require
    electron_1.app.quit();
}
var createWindow = function () {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 1000,
        height: 600,
        minWidth: 900,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: icon_1.iconPath
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../src/index.html"));
    // if unreponsive, show dialog box
    mainWindow.on("unresponsive", onUnresponsiveWindow);
    // prevent new window from opening
    mainWindow.webContents.on("new-window", function (event, url) {
        event.preventDefault();
    });
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", function () {
    createWindow();
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// --------------------------------
// menu
var menu = new electron_1.Menu();
menu.append(new electron_1.MenuItem({
    label: "Quit",
    click: function () {
        electron_1.app.exit(0);
    }
}));
electron_1.Menu.setApplicationMenu(menu);
/**
 * Run when the app is unresponsive
 */
function onUnresponsiveWindow(_e) {
    electron_1.dialog.showMessageBoxSync({
        title: "Application is not responding",
        buttons: ["Dismiss"],
        type: "warning",
        message: "Application is not responding…"
    });
}
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
require("./ipc/main");
require("./ipc/about");
//# sourceMappingURL=index.js.map