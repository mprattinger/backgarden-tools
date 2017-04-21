"use strict";

var nconf = require("nconf");
var path = require("path");

class ToolConfig{
    
    constructor(){
        var configFile = path.join(global.rootDir, "config.json");
        nconf.env().argv();

        nconf.file(configFile);
    }

    getConfig(name){
        return nconf.get(name);
    }
}

module.exports = ToolConfig;