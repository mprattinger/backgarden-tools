"use strict";

var gpio = require("./gpio");

class Werfer extends gpio {

    constructor(config) {
        super("tropferPin", "out", config);
    }
    
}

module.exports = Werfer;