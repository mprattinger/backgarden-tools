"use strict";

var os = require("os");

var configM = require("./configure");

var config = new configM();
config.runConfiguration();

var onoff = null;

if (os.platform() == "linux") {
    onoff = require("onoff").Gpio;
} else {
    onoff = require("./mocks/onoffMock");
}

var power = new onoff(config.config.getConfig("power-on"), "out");
var io = new onoff(config.config.getConfig("werfer"), "out");

power.write(1, (err) => {
    if (err) {
        console.log("Error writing pin " + err.mmessage);
    } else {
        console.log("power is on!");
    }
});

io.write(1, function (err) {
    if (err) {
        console.log("Error writing pin " + err.mmessage);
    } else {
        console.log("Werfer is on!");
    }
})

setTimeout(() => {
    io.write(0, (err) => {
        if (err) {
            console.log("Error writing pin " + err.mmessage);
        } else {
            console.log("Werfer is off!");
            power.write(0, (err) => {
    if (err) {
        console.log("Error writing pin " + err.mmessage);
    } else {
        console.log("power is off!");
    }
});
        }
    })
}, 2000);