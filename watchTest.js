var gpioClass = require("./mocks/onoffMock");
var configM = require("./configure");

var config = new configM();
config.runConfiguration();

var mock = new gpioClass(2, "in");

mock.watch(()=>{
    console.log("watched");
});