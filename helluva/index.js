import {webpackModules} from "@cumcord/modules";

let unpatch;
const helluva = [
	"https://www.youtube.com/watch?v=OlahNrlcgS4",
	"https://www.youtube.com/watch?v=el_PChGfJN8",
	"https://www.youtube.com/watch?v=kpnwRg268FQ",
	"https://www.youtube.com/watch?v=RghsgkZKedg",
	"https://www.youtube.com/watch?v=1ZFseYPmkAk",
	"https://www.youtube.com/watch?v=h2ZmVAdezF8",
	"https://www.youtube.com/watch?v=yXErLiSbxXQ"
];

function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export default {
    onLoad() {
        unpatch = cumcord.patcher.after("sendMessage", webpackModules.findByProps("sendMessage"), (args) => {
            if (args[1].content.startsWith("!helluva")) {
                args[1].content = random(helluva);
            }
            if (args[1].content.startsWith("!newhelluva")) {
                args[1].content = helluva[helluva.length-1];
            }
            return args;
        });
    },
    onUnload() {
        unpatch();
    }
};
