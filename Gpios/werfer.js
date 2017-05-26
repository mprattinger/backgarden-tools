"use strict";

var gpio = require("./gpio");

class Werfer extends gpio {

    constructor(config) {
        super("werferPin", "out", config, true);
    }

}

module.exports = Werfer;