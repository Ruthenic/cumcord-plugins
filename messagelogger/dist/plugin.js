(function(){"use strict";const o={modules:window.cumcord.modules,patcher:window.cumcord.patcher}.modules,e=o.webpackModules;let s;return o.commonModules,{onLoad:()=>(s=cumcord.patcher.after("sendMessage",e.findByProps("sendMessage"),(o=>{console.log(o[1].content)})),args),onUnload(){s()}}})();