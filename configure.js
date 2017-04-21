"use strict";

var logger = require("./tools/configLogger");
var config = require("./tools/toolConfig");

global.rootDir = __dirname;

class Configuration{

    constructor(){

    }   

    runConfiguration(){
        logger.configLogger();
        this.config = new config();
    } 
}

module.exports = Configuration;