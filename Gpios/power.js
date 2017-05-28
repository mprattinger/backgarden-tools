"use strict";

var os = require("os");

class Power {

    constructor(config) {
        this.configName = "power-on";
        this.mode = "out";

        this.config = config;

        if (os.platform() == "linux") {
            this.onoff = require("onoff").Gpio;
        } else {
            this.onoff = require("../mocks/onoffMock");
        }

        this.pin = this.config.config.getConfig(this.configName);
        this.io = new this.onoff(this.pin, this.mode);

        this.isOn = false;
    }

    on() {
        var that = this;
        return new Promise((resolve, reject) => {
            console.log("Written 1 to " + that.pin + " status is " + that.isOn);
            if (!that.isOn) {
                that.io.write(1, (err) => {
                    if (err) reject("Error writing on to pin " + that.pin);
                    else {
                        that.isOn = true;
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }

    off() {
        var that = this;
        return new Promise((resolve, reject) => {
            console.log("Written 1 to " + that.pin + " status is " + that.isOn);
            if (that.isOn) {
                that.io.write(0, (err) => {
                    if (err) reject("Error writing off to pin " + that.pin);
                    else {
                        that.isOn = false;
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }
}

var instance = null;
module.exports = {
    power: Power,
    getInstance: function (config) {
        if (instance == null) {
            instance = new Power(config);
        }
        return instance;
    }
}