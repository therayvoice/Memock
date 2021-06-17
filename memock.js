const express = require('express');
const app = express();

const path = require('path');
const hardlog = require('hardlog');
const chalk = require('chalk');
const fs = require('fs');
const crypto = require('crypto');

function getHashOfFile(fileName) {
  const hash = crypto.createHash('sha256');
  hash.setEncoding('hex');
  const fileURL = path.join(server.filesDirectory, fileName);
  const fileData = fs.readFileSync(fileURL, "utf8");
  hash.write(fileName); //check if we want fileName or fileData here. Test if MeMock works properly, then switch if needed
  hash.end();
  return hash.read();
}

const libraryInfo = {
  version: () => "3.0.1",
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
  filesDirectory: path.join(__dirname, "servedFiles"),
  mainJSONToServeAtRoot: {
    name: "MeMock Server",
    version: libraryInfo.version,
    hashMap: []
  },
  delayToMimicRealLatency: 10000,
  map: []
}

const nodeNameOf = fileNumber => `file${+fileNumber+1}`;

function startServer() {

  app.get("/", (req, res)=>{

    setTimeout(()=>{
      res.send(server.mainJSONToServeAtRoot);
    }, server.delayToMimicRealLatency);

  });

  // creating a server-map
  server.filesToServe.forEach((fileName, fileNumber) => {
    const nodeOfFile = nodeNameOf(fileNumber);

    server.map.push({
      file: fileName,
      node: nodeOfFile
    });
    hardlog.write(`The file ${colorTag(fileName)} is mapped to ${colorTag(nodeOfFile)}.`);
  });

  server.map.forEach((mapping) => {
    const fileURL = path.join(server.filesDirectory, mapping.file);
    app.get(`/${mapping.node}`, (req, res) => {
      setTimeout(()=>{
        res.sendFile(fileURL);
      }, server.delayToMimicRealLatency);
    });
  });

  app.listen(server.port, () => {
    hardlog.write(`${colorTag("MeMock Server")} Listening at localhost:${colorTag(server.port)}.`);
  })

}

let alterChrome = false;
function colorTag(tagName) {
  alterChrome = !alterChrome;
  if (alterChrome) {
    return chalk.bgBlack.blue.bold(tagName);
  } else {
    return chalk.bgBlue.black(tagName);
  }
}

// add fake server delay

module.exports = {
  init: function () {
    hardlog.write(`${colorTag("Memock Psudo-server tool")} was developed by ${colorTag(libraryInfo.authors())}.`);
    hardlog.write(`${colorTag("Memock Server logs")} stored at ${colorTag(server.sessionLogFile)}.`);
    startServer();
  },
  usePort: function (portNumber) {
    server.port = portNumber;
  },
  mainPageJSON: function (json) {
    server.mainJSONToServeAtRoot = json;
    if (server.mainJSONToServeAtRoot.hashMap == undefined) {
      server.mainJSONToServeAtRoot.hashMap = [];
    }
  },
  setServerDelay: function (delayTime) {
    server.delayToMimicRealLatency = delayTime;
  },
  addFile: function (fileName) {
    server.filesToServe.push(path.basename(fileName));
    server.mainJSONToServeAtRoot.hashMap.push({
      file: fileName,
      hash: getHashOfFile(fileName)
    });    
  },
  setFilesDirectory: function (dir) {
    // dir must be an absolute address pointing to a directory/folder
    server.filesDirectory = path.join(dir);
  }
}


