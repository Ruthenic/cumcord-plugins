(function(){"use strict";let n={newest:null,byid:null};function i(e){return{alt:e.alt,image:e.img,link:`https://xkcd.com/${e.num.toString()}`}}async function d(){let e=await fetch("https://xkcd.com/info.0.json");return e=await e.json(),i(e)}async function c(e){let t=await fetch(`https://xkcd.com/info.${e.toString()}.json`);return t.ok?(t=await t.json(),i(t)):!1}var r={onLoad(){n.newest=cumcord.commands.addCommand({name:"xkcd",description:"Sends the newest XKCD comic.",args:[],handler:(e,t)=>d().link}),n.byid=cumcord.commands.addCommand({name:"xkcd",description:"Sends the XKCD comic with the provided ID.",args:[{name:"id",description:"The ID of the XKCD comic you want to send.",type:"string",required:!0}],handler:(e,t)=>{let o=c(e.args.id).link;if(!o)t("The requested comic does not exist!");else return o.link}})},onUnload(){n.newest(),n.byid()}};return r})();