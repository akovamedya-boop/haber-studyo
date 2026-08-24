const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1320,
    height: 880,
    title: "MedyaForge - Dijital İçerik & Video Stüdyosu",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  const possiblePaths = [
    path.join(__dirname, 'www', 'index.html'),
    path.join(app.getAppPath(), 'www', 'index.html'),
    path.join(__dirname, 'index.html')
  ];

  let loaded = false;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      win.loadFile(p);
      loaded = true;
      break;
    }
  }

  if (!loaded) {
    win.loadURL(`file://${path.join(__dirname, 'www', 'index.html')}`);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
