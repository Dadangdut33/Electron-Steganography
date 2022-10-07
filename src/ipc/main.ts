import { ipcMain } from "electron";

ipcMain.on("test", (event, arg) => {
	console.log(arg);
	console.log(arg);
});
