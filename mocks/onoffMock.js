"use strict";

var fs = require("fs");
var chokidar = require("chokidar");

class Gpio{

    constructor(pin, mode){
        this.pin = pin;
        this.mode = mode;
        this.listeners = [];
    }

    write(value, cb){
        console.log("Would write " + value + " to pin " + this.pin);
        cb();
    }

    read(cb) {
        console.log("Would read pin " + this.pin );
        fs.readFile("onoffMockData.json", "utf8", (err, data) => {
            if(err) throw err;
            var onoff = JSON.parse(data);
            var pin = onoff["pin" + this.pin];
            cb(pin);
        });
    }

    watch(cb){
        // this.listeners.push(cb);
        var watch = chokidar.watch(".", {ignored: /(^|[\/\\])\../});

        watch.on("change", (path) => {
            var watchFor = "pin" + this.pin + ".txt";
            if (path.includes(watchFor)){
                 cb();
            }
        });
    }
}

module.exports = Gpio;