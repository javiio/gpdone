import { app, BrowserWindow, Menu } from 'electron';
import serve from 'electron-serve';
const contextMenu = require('electron-context-menu');
import { createWindow } from './helpers';


const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();

    contextMenu({
      prepend: (defaultActions, params, browserWindow) => [
        {
          label: 'Inspect element',
          click: () => {
            browserWindow.webContents.inspectElement(params.x, params.y);
          },
        },
      ],
    });
  }

  mainWindow.webContents.on('render-process-gone', (event, detailed) => {
    console.log(`Crashed, reason: ${detailed.reason}, exitCode = ${detailed.exitCode}`);
    if (detailed.reason == 'crashed') {
        // relaunch app
        app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
        app.exit(0)
    }
  });
})();

app.on('window-all-closed', () => {
  app.quit();
});

process.on('uncaughtException', (err) => {
  console.log('Error', err);
});
