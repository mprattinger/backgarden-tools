"use strict";

var gpio = require("./gpio");

class Werfer extends gpio {

    constructor(config) {
        super("sprinklerPin", "out", config);
    }
    
}

module.exports = Werfer;