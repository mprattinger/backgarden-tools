"use strict";

var os = require("os");
var power = require("./power");

class Gpio {

    constructor(configName, mode, config, requirePower = false) {
        this.configName = configName;
        this.mode = mode;
        this.config = config;
        this.requirePower = requirePower;
        
        console.log("Requires power? (" + configName + "): " + requirePower);

        if (os.platform() == "linux") {
            this.onoff = require("onoff").Gpio;
        } else {
            this.onoff = require("../mocks/onoffMock");
        }

        this.pin = this.config.config.getConfig(configName);
        this.io = new this.onoff(this.pin, mode);

        this.isOn = false;
        this.power = null;

        if (this.requirePower) {
            this.power = power.getInstance(this.config);
        }
    }

    on() {
        var that = this;
        if (that.requirePower) {
            return that.setPower(true).then(that.setGpio(true));
        } else {
            return that.setGpio(true);
        }
    }

    off() {
        var that = this;
        if (that.requirePower) {
            return that.setPower(false).then(that.setGpio(false));
        } else {
            return that.setGpio(false);
        }
    }

    setGpio(onoff) {
        var that = this;
        return new Promise((resolve, reject) => {
            if (onoff) {
                that.io.write(1, (err) => {
                    if (err) reject("Error writing on to pin " + this.pin);
                    else {
                        console.log("Written 1 to " + that.pin);
                        this.isOn = true;
                        resolve();
                    }
                });
            } else {
                that.io.write(0, (err) => {
                    if (err) reject("Error writing off to pin " + this.pin);
                    else {
                        console.log("Written 0 to " + that.pin);
                        this.isOn = false;
                        resolve();
                    }
                });
            }
        });
    }

    setPower(onoff) {
        var that = this;
        return new Promise((resolve, reject) => {
            if (onoff) {
                that.power.on().then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            } else {
                that.power.off().then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }
}

module.exports = Gpio;
