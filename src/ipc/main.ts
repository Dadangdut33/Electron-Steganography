import { app, ipcMain, Notification } from "electron";
import { iconPath } from "./icon";

ipcMain.on("get-version", (event, arg) => {
	event.returnValue = app.getVersion();
});

ipcMain.on("status-notif", (event, arg) => {
	new Notification({
		title: "Status",
		body: arg.msg,
		icon: iconPath,
	}).show();
});
