const { ipcRenderer } = require("electron");

console.log("s");
// test send ipc
ipcRenderer.send("test", "ini pesan");
