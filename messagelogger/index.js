import {webpackModules} from "@cumcord/modules";

let unpatch;

export default {
    onLoad() {
        unpatch = cumcord.patcher.after("sendMessage", webpackModules.findByProps("sendMessage"), (args) => {
        	console.log("[messagelogger] User sent message: " + args[1].content);
        });
        return args;
    },
    onUnload() {
        unpatch();
    }
};
