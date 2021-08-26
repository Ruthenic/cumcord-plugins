const getElementFromMessageId = cumcord.modules.webpackModules.findByProps("getElementFromMessageId").getElementFromMessageId;

window.deletedMessages = []

let unpatch;
let untimeout;

function styleMessages() {
	for (let message of window.deletedMessages) {
		try {
			/*message["deletedHtmlElement"].style.setProperty("color", "#f04747", "important");
			document.getElementById(message["id"]).style.setProperty("color", "#f04747", "important");*/ //MLV2 style
																									   //TODO: make this shit work
			message["deletedHtmlElement"].style.backgroundColor = 'rgba(240, 71, 71, 0.1)';
			document.getElementById(message["id"]).style.backgroundColor = 'rgba(240, 71, 71, 0.1)'; //Goosemod style
																									   //TODO: when cumcord adds settings, allow a toggle between the two
		} catch (error) {
			//console.log(error)
		}
	}
}

export default {
    onLoad() {
    	untimeout = setInterval(styleMessages, 300);
        unpatch = cumcord.patcher.instead("dispatch", Object.getPrototypeOf(cumcord.modules.webpackModules.findByProps("dispatch")), (args, orig) => { //"prototype bullshit", thanks creatable
            if (args[0]["type"] === "MESSAGE_DELETE") {
                try {
                    var deletedMessageInfo = {"deletedHtmlElement": getElementFromMessageId(args[0]["id"])};
					if (deletedMessageInfo["deletedHtmlElement"] === null) return; //some some reason, a shitton of the MESSAGE_DELETE events that are sent end up null... not actual deleted messages, they're just randomly sent for no reason. much fun
                    deletedMessageInfo["deletedText"] = deletedMessageInfo["deletedHtmlElement"].innerText.split("\n")[3];
                    deletedMessageInfo["deletedHtmlElement"].style.backgroundColor = 'rgba(240, 71, 71, 0.1)';
                    deletedMessageInfo["id"] = "chat-messages-" + args[0]["id"];
                    console.log("[messagedeletion] New Deleted Message: " + deletedMessageInfo["deletedText"]);
					if (window.deletedMessages.indexOf(deletedMessageInfo) == -1) {
                    	window.deletedMessages.push(deletedMessageInfo);
					}
                    console.log(window.deletedMessages);
                	return;
                } catch (error) {
                    console.log("[messagedeletion] Failed to get deleted message!");
                    console.error(error);
                }
            }
            return orig(...args);
        });
    },
    onUnload() {
        unpatch();
        clearInterval(untimeout);
    }
};
