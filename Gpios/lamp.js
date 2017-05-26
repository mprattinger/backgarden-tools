"use strict";

var gpio = require("./gpio");

class Lamp extends gpio {

    constructor(config) {
        super("lampPin", "out", config);
    }
    
}

module.exports = Lamp;