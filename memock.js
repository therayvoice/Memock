"use strict"
const path = require('path');
const chalk = require('chalk');
const logs = require('hardlog');
const fs = require('ray-fs');
const core = require('ray-core');
const serve = require('ray-serve');
const hash = require('ray-hash');
const fetch = require('node-fetch');
const zeros = require('ironberry').getLeadingZeros;

const memockAuthors = "Ray Voice and Anna Voice";
const baseServer = fs.readJSON('basic-server-info.json').value;
baseServer.port = serve.port;
baseServer.delayToMimicRealLatency = serve.latency;
const memockLogs = "memock-logs.txt";

logs.init(memockAuthors, baseServer.version);

module.exports = {
  server: baseServer,
  init: function(callback) {serve.listen(callback)},
  usePort: function(port) {serve.port = this.server.port = port},
  mainPageJSON: (sName, sVersion) => { serve.showRoot(sName, sVersion) },
  setServerDelay: function(time) {serve.latency = this.server.delayToMimicRealLatency = time},
  nodeNameOf: (fileIndex) => `file{+fileIndex+1`,
  bindJSONAtNode: function(node, json) { serve.serveJSON(node, json) },
  bindFileAtNode: function(node, file) {
    const fileHash = hash
		       .getHashOfFile(file)
		       .value;
    console.log(fileHash, this.server);
    this.server
	  .map
	  .push({fileName: file, hash: fileHash});
    serve.serveFile(node, file);
  },
  static: function(dir) {
    serve.static(dir);
  },
  getShardPrefix: (totalFiles, fileNumber) => zeros(totalFiles, fileNumber)
}

