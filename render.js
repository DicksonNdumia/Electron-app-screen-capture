const { ipcRenderer } = require("electron");
//Testing if the render work
//alert("Hello From Render Please");

document.getElementById("camera-btn").addEventListener("click", () => {
  ipcRenderer.send("capture-screen");
});
