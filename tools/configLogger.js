"use strict";

var winston = require("winston");
var path = require("path");
var fs = require("fs");

module.exports.configLogger = function(){
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, { level: "info", colorize: true });

    var winstonLogDir = path.join(global.rootDir, "log");
    if(!fs.existsSync(winstonLogDir)){
        fs.mkdirSync(winstonLogDir);
    }

    winstonLogDir = path.join(winstonLogDir, "tools.log");
    winston.add(require("winston-daily-rotate-file"), {
        filename: winstonLogDir,
        datePattern: ".ddMMyyy",
        level: "info"
    });
}