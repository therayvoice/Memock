const express = require('express');
const app = express();

const dns = require('dns');
const os = require('os');
const path = require('path');
const hardlog = require('hardlog');
const chalk = require('chalk');

const libraryInfo = {
  version: () => "2.0.0",
  authors: () => "Ray Voice and Anna Voice",
  logFile: () => "memock-hardlogs.txt",
}

hardlog.init(libraryInfo.authors(),
             libraryInfo.version(),
             libraryInfo.logFile());

const server = {
  port: 4321,
  sessionLogFile: "server-session-hardlogs.txt",
  filesToServe: [],
  filesDirectory: "servedFiles",
  mainJSONToServeAtRoot: {
    name: "MeMock Server",
    version: libraryInfo.version
  },
  delayToMimicRealLatency: 10000,
  map: []
}

function nodeNameOf(file){
  return path.basename(file, path.extname(file));
}

function showServerMap() {
  server.filesToServe.forEach((fileName) => {
    const nodeOfFile = nodeNameOf(fileName);
    server.map.push({
      file: fileName,
      node: nodeOfFile;
    });
    hardlog.write(`The file ${chalk.bgCyan(fileName)} is mapped to ${chalk.bgGreen(nodeOfFile)}.`);
  });
}

function startServer() {
  app.get("/", (req, res)=>{
    res.send(server.mainJSONToServeAtRoot);
  });
  server.map.forEach((mapping) => {
    app.get(mapping.node, (req, res)=>{
      res.sendFile(`${server.filesDirectory}${mapping.file}`);
    });
  });
}

module.exports = {
  init: function () {
    hardlog.write(`Memock Psudo-server tool was developed by ${libraryInfo.authors}`);
    hardlog.write(`Memock Server logs stored at ${chalk.yellow(server.sessionLogFile)}`);
    hardlog.write(`MeMock Server Listening at localhost:${port}`);
    showServerMap();
    startServer();
  },
  usePort: function (portNumber) {
    server.port = portNumber;
  },
  mainPageJSON: function (json) {
    server.mainJSONToServeAtRoot = json;
  },
  setServerDelay: function (delayTime) {
    server.delayToMimicRealLatency = delayTime;
  },
  addFile: function (fileName) {
    server.filesToServe.push(path.basename(fileName));
  }
}

/*
# Installation
Use the following command to install MeMock:
```
npm i memock --save-dev
```
*/
