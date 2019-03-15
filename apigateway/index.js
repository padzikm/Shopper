"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./src/server");
// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server_1.server.listen().then(function (url) {
    console.log("\uD83D\uDE80  Server ready at " + url);
});
