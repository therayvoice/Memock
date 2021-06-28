"use strict"
const fs = require('ray-fs');
const serve = require('ray-serve');
const hash = require('ray-hash');
const path = require('path');

const memockAuthors = "Ray Voice and Anna Voice";
const baseServer = fs.readJSON(path.join(__dirname, 'basic-server-info.json')).value;
baseServer.port = serve.port;
baseServer.delayToMimicRealLatency = serve.latency;

module.exports = {
  server: baseServer,
  init: function(callback) {serve.listen(callback)},
  usePort: function(port) {serve.port = this.server.port = port; return this},
  fileHash: (file) => hash.getHashOfFile(file).value,
  mainPageJSON: (sName, sVersion) => {serve.showRoot(sName, sVersion); return this},
  mainPageDefault: function(sName, sVersion) {serve.serveJSON("/", this.server); return this},
  setServerDelay: function(time) {serve.latency = this.server.delayToMimicRealLatency = time; return this},
  serialNodeName: (fileIndex) => `file${+fileIndex+1}`,
  bindJSONAtNode: function(node, json) {
    serve.serveJSON(node, json);
    this.addToMap(node, "A JSON Object");
    return this;
  },
  bindFileAtNode: function(node, file) {
    serve.serveFile(node, file);
    this.addToMap(node, file, this.fileHash(file));
    return this;
  },
  static: function(dir) {
    this.staticMapInit(dir);
    serve.static(dir);
    return this;
  },
  addToMap: function(nodeName, fileName, dataHash) {
    this.server.nodeMap.push({file: fileName, node: nodeName, hash: dataHash});
    return this;
  },
  staticMapInit: function(dir) {
    const filesInDir = fs.cd(dir).lsFile().value;
    for (let file of filesInDir) {
      this.addToMap(`/${file}`, file, this.fileHash(file)); 
    }
  },
  serialServe: function(dir) {
    const filesInDir = fs.cd(dir).lsFile().value;
    for (let fileIndex in filesInDir) {
      const node = `/file${+fileIndex+1}`;
      const file = filesInDir[fileIndex];
      const hash = this.fileHash(file);
      this.addToMap(node, file, hash); 
      this.bindFileAtNode(node, file);
    }
    return this;
  }
}

