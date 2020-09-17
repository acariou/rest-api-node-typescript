"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var fs_1 = __importDefault(require("fs"));
var compression_1 = __importDefault(require("compression"));
var router_1 = __importDefault(require("./router"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(compression_1.default());
app.use(morgan_1.default('common', {
    stream: fs_1.default.createWriteStream('./access.log', { flags: 'a' })
}));
//doing console.log
app.use(morgan_1.default('dev'));
var corsMiddleware = cors_1.default({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);
router_1.default(app);
var myApp = app;
exports.default = myApp;
//# sourceMappingURL=app.js.map