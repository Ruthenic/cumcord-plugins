import {webpackModules} from "@cumcord/modules";

let unpatch;

function random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export default {
    onLoad() {
        unpatch = cumcord.patcher.after("sendMessage", webpackModules.findByProps("sendMessage"), (args) => {
			const faces = ["8}", ":)", ":(", ":O", "O7", "o/"];
            if (args[1].content.startsWith("!emo")) {
				var new_msg = args[1].content.slice(5) + " " + random(faces);
                args[1].content = new_msg;
            }
            if (args[1].content.startsWith("!smile")) {
				var new_msg = args[1].content.slice(7) + " :)";
                args[1].content = new_msg;
            }
            if (args[1].content.startsWith("!frown")) {
				var new_msg = args[1].content.slice(7) + " :(";
                args[1].content = new_msg;
            }
            if (args[1].content.startsWith("!sunglasses")) {
				var new_msg = args[1].content.slice(12) + " 8}";
                args[1].content = new_msg;
            }
            if (args[1].content.startsWith("!pog")) {
				var new_msg = args[1].content.slice(5) + " :O";
                args[1].content = new_msg;
            }
            if (args[1].content.startsWith("!salute")) {
				var new_msg = args[1].content.slice(8) + " 07";
                args[1].content = new_msg;
            }
            if (args[1].content.startsWith("!wave")) {
				var new_msg = args[1].content.slice(6) + " o/";
                args[1].content = new_msg;
            }
            return args;
        });
    },
    onUnload() {
        unpatch();
    }
};
