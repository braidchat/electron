'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const shell = electron.shell;

// overlay scrollbars on windows, linux
app.commandLine.appendSwitch("--enable-overlay-scrollbar");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      allowDisplayingInsecureContent: true,
      nodeIntegration: false
    }});


  // and load the index.html of the app.
  mainWindow.loadURL('https://braid.chat');
  mainWindow.show();

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  var template = [{
    label: "Application",
    submenu: [
    { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
    { type: "separator" },
    { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
      label: "Edit",
      submenu: [
      { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
      { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
      { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]}, {
        label: 'View',
        submenu: [
        { label: 'Reload', accelerator: 'Command+R',
          click: function() { BrowserWindow.getFocusedWindow().reload(); } },
        { label: 'Back', accelerator: 'Command+[',
          click: function() {
            var content = BrowserWindow.getFocusedWindow().webContents;
            if (content.canGoBack()) {
              content.goBack();
            } }
        },
          { label: 'Forward', accelerator: 'Command+]',
            click: function() {
              var content = BrowserWindow.getFocusedWindow().webContents;
              if (content.canGoForward()) {
                content.goForward();
              }
            } },
          { type: 'separator' },
            { label: 'Toggle DevTools',
              accelerator: 'Alt+Command+J',
              click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); } }
    ]
  }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));


  // open links in browser, not electron
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
