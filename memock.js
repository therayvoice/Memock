"use strict"
const path = require('path');
const chalk = require('chalk');
const logs = require('hardlog');
const fs = require('ray-fs');
const core = require('ray-core');
const serve = require('ray-serve');
const hash = require('ray-hash');
const fetch = require('node-fetch');

const memockAuthors = "Ray Voice and Anna Voice";
const server = fs.readJSON('basic-server-info.json');
const memockLogs = "memock-logs.txt";

logs.init(memockAuthors, server.version);

module.exports = {
  init: function(callback) {serve.listen(callback)},
  usePort: (port) => { serve.port = port },
  mainPageJSON: (sName, sVersion) => { serve.showRoot(sName, sVersion) },
  setServerDelay: (time) => {serve.latency = time},
  nodeNameOf: (fileIndex) => `file{+fileIndex+1`,
  bindJSONAtNode: function(node, json) { serve.serveJSON(node, json) },
  bindFileAtNode: function(node, fileName, fileDir) { serve.serveFile(node, fileName, fileDir) },
   
}

