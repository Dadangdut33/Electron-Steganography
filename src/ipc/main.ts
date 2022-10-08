import { app, ipcMain } from "electron";

ipcMain.on("get-version", (event, arg) => {
	event.returnValue = app.getVersion();
});

ipcMain.on("test", (event, arg) => {
	console.log(arg);
});
