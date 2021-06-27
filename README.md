# Memock
![GitHub repo size](https://img.shields.io/github/repo-size/ray6464/memock)
![npm](https://img.shields.io/npm/dm/memock)
![NPM](https://img.shields.io/npm/l/memock)
![Twitter Follow](https://img.shields.io/twitter/follow/rayshorthead?style=social)
![npm](https://img.shields.io/npm/v/memock)

A NodeJS library for developing back-end tools, mock servers, mock APIs, etc. It will allow you to develop and initiate a server that serves predetermined files and JSON objects over predetermined nodes, all with a few lines of JavaScript code.

# Installation
Use the following command to install MeMock as a development-tool:
```
npm i memock --save-dev
```

# Usage
To start the server, with all the default settings:
```
const memock = require('../memock.js');
const path = require('path');
//const ironberry = require();

memock
  .usePort(4001)           // Set Port Number
  .setServerDelay(2000)    // Set a delay in response, like real download time
  .static('./public')      // Serve all files in Public
  .bindJSONAtNode('/noon', {name:"ray", age:26})
  .bindFileAtNode('/dawn', path.resolve('any/where/anyFile.xyz'))
  .mainPageDefault();      // Serve the server details on Root 
  .init(); // starts the server
```

# Methods
All methods are chainable unless otherwise mentioned.
1. `.usePort(port)`: Sets a port to listen to requests at.
2. `.setServerDelay(time)`: Sets a delay to the server to mimic download times.
3. `.static(dir)`: Serves all file in the provided `dir` directory. `dir` must be an absolute path.
4. `.bindJSONAtNode(node, JSONObject)`: Serves a JSON Object at the provided node.
5. `.bindFileAtNode(node, filePath)`: Serves a file `filePath` at `node`. Use absolute paths. 
6. `.mainPageDefaults()`: Serves the built-in server object (including a server map) at root `'/'`.
7. `.init()`: Starts the server.
8. `.fileHash()`: Get hash of File. (unchainable)
9. `.serialNodeName(fileIndex)`: Get a serial node name for a file.
10. `.addToMap(node, file, hash)`: Add the info to the built-in server object.
11. `staticMapInit(dir)`: Add the file, node, and hash info of all files in a directory to the built-in server object.
12. `.server`: Get the built-in server object. (unchainable)
13. `.serialServe(dir)`: Serve all files in the provided `dir` directory on serial nodes like `/file1`, `/file2`, `/file3`, etc.
14. More stuff Coming Soon!

# License
MIT License

Copyright (c) 2021 Ray Voice

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

