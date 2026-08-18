const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 850,
    title: "Medya Görsel & Haber Stüdyosu",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  // Olası tüm dosya yollarını sırayla kontrol eder
  const possiblePaths = [
    path.join(__dirname, 'www', 'index.html'),
    path.join(app.getAppPath(), 'www', 'index.html'),
    path.join(__dirname, 'index.html'),
    path.join(process.resourcesPath, 'app', 'www', 'index.html'),
    path.join(process.resourcesPath, 'www', 'index.html')
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
    // Fallback: Doğrudan URL formatıyla yükle
    win.loadURL(`file://${path.join(__dirname, 'www', 'index.html')}`);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
