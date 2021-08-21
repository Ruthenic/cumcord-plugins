import {webpackModules} from "@cumcord/modules";

let unpatch;

export default {
    onLoad() {
        unpatch = cumcord.patcher.after("sendMessage", webpackModules.findByProps("sendMessage"), (args) => {
            if (args[1].content.startsWith("!manifesto")) {
                args[1].content = "<https://rentry.co/cumcord_manifesto>";
            }
        });
    },
    onUnload() {
        unpatch();
    }
};
