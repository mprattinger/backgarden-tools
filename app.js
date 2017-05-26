"use strict";

var WerferClass = require("./Gpios/werfer");
var TropferClass = require("./Gpios/tropfer");
var SprinklerClass = require("./Gpios/sprinkler");
var LampClass = require("./Gpios/lamp");
var configM = require("./configure");

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

var werfer = new WerferClass(config);
var tropfer = new TropferClass(config);
var sprinkler = new SprinklerClass(config);
var lamp = new LampClass(config);

if(opt.options.werfer){
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