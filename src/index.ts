import { app, BrowserWindow, dialog, Menu, MenuItem } from "electron";
import * as path from "path";
import { iconPath } from "./ipc/icon";

// ----------------------------
// Vars
let mainWindow: BrowserWindow | null = null;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	// eslint-disable-line global-require
	app.quit();
}

const createWindow = (): void => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		minWidth: 900,
		minHeight: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		icon: iconPath,
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
app.on("ready", () => {
	createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// --------------------------------
// menu
const menu = new Menu();
menu.append(
	new MenuItem({
		label: "Quit",
		click: () => {
			app.exit(0);
		},
	})
);

Menu.setApplicationMenu(menu);

/**
 * Run when the app is unresponsive
 */
function onUnresponsiveWindow(_e: any) {
	dialog.showMessageBoxSync({
		title: "Application is not responding",
		buttons: ["Dismiss"],
		type: "warning",
		message: "Application is not responding…",
	});
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
import "./ipc/main";
import "./ipc/about";
