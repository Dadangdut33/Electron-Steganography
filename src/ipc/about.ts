import { ipcMain, Notification, shell } from "electron";

ipcMain.on("update-available", (event, arg) => {
	const updateNotif = new Notification({
		title: "Update Available!",
		body: `A new update (${arg}) is available. Click here to download it.`,
	});

	updateNotif.show();
	updateNotif.on("click", () => {
		shell.openExternal("https://github.com/Dadangdut33/Electron-Steganography/releases/latest");
	});

	event.returnValue = "ok";
});

ipcMain.on("update-not-available", (event, arg) => {
	const updateNotif = new Notification({
		title: "No Update Available!",
		body: `You are using the latest version (${arg}).`,
	});

	updateNotif.show();

	event.returnValue = "ok";
});
