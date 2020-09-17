"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
//this will emulate a full ES2015+ environment
//and is intended to be used in an application rather than a library/tool.
require('babel-polyfill');
//this will load all env variables for dev and test mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//load http module
var http = __importStar(require("http"));
var app_1 = __importDefault(require("./app"));
var iconvLite = __importStar(require("iconv-lite"));
//used for characted encoding conversion
iconvLite.encodingExists('foo');
//signal events are emitted when the Node.js process receives a signal
//SIGINT signal is with -C in most terminal programs
process.on('SIGINT', function () {
    process.exit(0);
});
//this is when testing with jest - its set up
//process.env.NODE_ENV to be test
//in this case we will choose test port accordingly
var IS_TEST = process.env.NODE_ENV === 'test';
//we will replace those port number later on with env vars
var port = IS_TEST ? 3001 : 3000;
//create a server
var server = new http.Server(app_1.default);
//listen on the provided port
server.listen(port, function () {
    if (!IS_TEST) {
        console.log("Listening at http://localhost:" + port + "/api/v1");
    }
});
//server error handler
server.on('error', function (error, port) {
    if (error.syscall !== "listen") {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            if (process.env.NODE_ENV !== 'test') {
                console.log(port + " requires elevated privileges");
            }
            process.exit(1);
        case 'EADDRINUSE':
            if (process.env.NODE_ENV !== 'test') {
                console.log(port + " is already in use");
            }
            process.exit(1);
        default:
            throw error;
    }
});
exports.default = server;
//# sourceMappingURL=server.js.map