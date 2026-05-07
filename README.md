# 📸 ScreenIt — Electron Screen Capture App

A lightweight desktop application built with Electron that allows users to capture screenshots directly from their desktop.

The application runs in the system tray and captures the current screen using Electron's built-in desktop capture APIs.

---

# 🚀 Features

- 📷 Capture full screen screenshots
- 🖥️ Uses Electron desktop capturing APIs
- 🎯 Runs from the system tray
- 🪟 Frameless transparent window
- 💾 Automatically saves screenshots
- 📂 Opens captured image automatically after saving

---

# 🛠️ Technologies Used

- JavaScript
- HTML
- CSS
- Electron
- Node.js APIs

---

# 📂 Project Structure

```bash
screen-record/
│
├── assets/
│   └── camera.ico
│
├── index.html
├── main.js
├── package.json
```

---

# ⚡ How It Works

## 1. Creating the Electron Window

The app creates a transparent frameless Electron window.

```js
const window = new BrowserWindow({
  frame: false,
  show: false,
  transparent: true,
});
```

### Explanation

- `frame: false` → removes the default operating system window frame
- `show: false` → window starts hidden
- `transparent: true` → creates a transparent background

---

## 2. Creating a System Tray Icon

The application adds a tray icon to the desktop taskbar/system tray.

```js
const tray = new Tray(iconPath);
```

Clicking the tray icon toggles the visibility of the app window.

```js
tray.on("click", () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    window.show();
  }
});
```

---

## 3. Capturing the Screen

Electron's `desktopCapturer` API is used to capture the current screen.

```js
const screens = await desktopCapturer.getSources({
  types: ["screen"],
});
```

### Explanation

- `desktopCapturer.getSources()` retrieves available screen sources
- `types: ["screen"]` captures the entire monitor screen

---

## 4. Getting Screen Size

The app retrieves the current display size.

```js
const screenSize = screen.getPrimaryDisplay().workAreaSize;
```

This ensures screenshots are captured at the correct resolution.

---

## 5. Saving the Screenshot

The captured image is converted into PNG format and saved locally.

```js
const img = screens[0].thumbnail.toPNG();
```

The file is stored in the user's home directory.

```js
const filePath = path.join(os.homedir(), filename);
```

---

## 6. Opening the Screenshot Automatically

After saving the image, Electron opens the screenshot automatically.

```js
shell.openExternal(`file://${filePath}`);
```

---

# ▶️ Running the Project

## Install Dependencies

```bash
npm install
```

## Start the Application

```bash
npm start
```

## Build the Desktop App

```bash
npm run build
```

---

# 📸 Example Workflow

1. Launch the application
2. App appears in the system tray
3. Click the tray icon
4. Trigger screenshot capture
5. Screenshot gets saved automatically
6. Captured image opens instantly

---

# 🧠 Concepts Learned

This project demonstrates:

- Electron window management
- IPC communication with `ipcMain`
- Desktop screen capturing
- File system operations
- Tray applications
- Native desktop integrations
- Working with Node.js inside Electron

---

# 📌 Future Improvements

- Add keyboard shortcuts
- Add screen recording support
- Save screenshots to a dedicated folder
- Add image editing tools
- Multi-monitor support
- Notifications after capture

---

# 👨‍💻 Author

Dickson Ndumia
