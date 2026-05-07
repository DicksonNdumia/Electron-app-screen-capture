const {
  app,
  BrowserWindow,
  ipcMain,
  screen,
  desktopCapturer,
  shell,
  Tray,
  Menu,
} = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const os = require("node:os");

app.whenReady().then(() => {
  const window = new BrowserWindow({
    frame: false,
    show: false,
    transparent: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  const iconPath = path.join(__dirname, "assets/camera.ico");
  const tray = new Tray(iconPath);
  tray.on("click", () => {
    if (window.isVisible()) {
      window.hide();
    } else {
      window.show();
    }
  });

  const menuTemplate = [
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ];
  const contextMenu = Menu.buildFromTemplate(menuTemplate);
  tray.setContextMenu(contextMenu);

  window.loadFile("index.html");

  ipcMain.on("capture-screen", async () => {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    const screens = await desktopCapturer.getSources({
      types: ["screen"],
      thumbnailSize: {
        width: screenSize.width,
        height: screenSize.height,
      },
    });
    const img = screens[0].thumbnail.toPNG();
    const timeStamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `screenshot-${timeStamp}.png`;
    const filePath = path.join(os.homedir(), filename);
    fs.writeFile(filePath, img, (err) => {
      shell.openExternal(`file://${filePath}`);
    });
  });
});
