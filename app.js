"use strict";

var WerferClass = require("./Gpios/werfer");
var TropferClass = require("./Gpios/tropfer");
var SprinklerClass = require("./Gpios/sprinkler");
var LampClass = require("./Gpios/lamp");
var configM = require("./configure");
var powerM = require("./Gpios/power");

var opt = require("node-getopt").create([
    ["", "on", "Einschalten"],
    ["", "off", "Ausschalten"],
    ["w", "werfer", "Werfer"],
    ["s", "sprinkler", "Sprinkler"],
    ["t", "tropfer", "Tropfer"],
    ["l", "lamp", "Lampe einschalten"],
    ["p", "power", "Trafo einschalten"]
]).bindHelp().parseSystem();

var config = new configM();
config.runConfiguration();

if(opt.options.werfer){
    var werfer = new WerferClass(config);
    if(opt.options.on){
        console.log("Werfer einschalten");
        werfer.on().then(()=>{
            console.log("Werfer is on");
        }).catch((err)=>{
            console.log(err);
        });
    }else{
        console.log("Werfer ausschalten");
    }
}

if(opt.options.sprinkler){
    var sprinkler = new SprinklerClass(config);    
    if(opt.options.on){
        console.log("Sprinkler einschalten");
        sprinkler.on().then(()=>{
            console.log("Sprinkler is on");
        }).catch((err)=>{
            console.log(err);
        });
    }else{
        console.log("Sprinkler ausschalten");
    }
}

if(opt.options.tropfer){
    var tropfer = new TropferClass(config);
    if(opt.options.on){
        console.log("Tropfer einschalten");
        tropfer.on().then(()=>{
            console.log("Tropfer is on");
        }).catch((err)=>{
            console.log(err);
        });
    }else{
        console.log("Tropfer ausschalten");
    }
}

if(opt.options.lamp){
    var lamp = new LampClass(config);
    if(opt.options.on){
        console.log("Lampe einschalten");
        lamp.on().then(()=>{
            console.log("Lampe ist ein");
        }).catch((err)=>{
            console.log(err);
        });
    }else{
        console.log("Lampe ausschalten");
        lamp.off().then(()=>{
            console.log("Lampe ist aus");
        }).catch((err)=>{
            console.log(err);
        });
    }
}

if(opt.options.power){
    var power = powerM.getInstance(config);
    if(opt.options.on){
        console.log("Trafo einschalten");
        power.on().then(()=>{
            console.log("Trafo ist ein");
        }).catch((err)=>{
            console.log(err);
        });
    }else{
        console.log("Trafo ausschalten");
        power.off().then(()=>{
            console.log("Trafo ist aus");
        }).catch((err)=>{
            console.log(err);
        });
    }
}