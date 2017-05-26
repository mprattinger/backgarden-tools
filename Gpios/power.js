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
        return new Promise((resolve, reject) => {
            if (!this.isOn) {
                this.io.write(1, (err) => {
                    if (err) reject("Error writing on to pin " + this.pin);
                    else {
                        this.isOn = true;
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }

    off() {
        return new Promise((resolve, reject) => {
            if (this.isOn) {
                this.io.write(0, (err) => {
                    if (err) reject("Error writing off to pin " + this.pin);
                    else {
                        this.isOn = false;
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