"use strict";

var os = require("os");
var power = require("./power");

class Gpio {

    constructor(configName, mode, config, requirePower=false) {
        this.configName = configName;
        this.mode = mode;
        this.config = config;
        this.requirePower = requirePower;

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
        if(this.requirePower){
            return this.setPower(true).then(this.setGpio(true));
        } else {
            return this.setGpio(true);
        }
    }

    off() {
        if(this.requirePower){
            return this.setPower(false).then(this.setGpio(false));
        } else {
            return this.setGpio(false);
        }
    }

    setGpio(onoff) {
        return new Promise((resolve, reject) => {
            if (onoff) {
                this.io.write(1, (err) => {
                    if (err) reject("Error writing on to pin " + this.pin);
                    else {
                        this.isOn = true;
                        resolve();
                    }
                });
            } else {
                this.io.write(0, (err) => {
                    if (err) reject("Error writing off to pin " + this.pin);
                    else {
                        this.isOn = false;
                        resolve();
                    }
                });
            }
        });
    }

    setPower(onoff) {
        return new Promise((resolve, reject) => {
            if (onoff) {
                this.power.on().then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            } else {
                this.power.off().then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }
}

module.exports = Gpio;