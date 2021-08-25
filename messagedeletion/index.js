const getElementFromMessageId = cumcord.modules.webpackModules.findByProps("getElementFromMessageId").getElementFromMessageId;

window.deletedMessages = []

let unpatch;
let untimeout;

function styleMessages() {
	for (let message of window.deletedMessages) {
		//console.log("[messagedeletion] Trying to restyle...")
		try {
			message["deletedHtmlElement"].style.backgroundColor = 'rgba(240, 71, 71, 0.1)';
			document.getElementById(message["id"]).style.backgroundColor = 'rgba(240, 71, 71, 0.1)';
			//console.log("[messagedeletion] Correctly styled message!")
		} catch (error) {
			//console.log("[messagedeletion] Failed to restyle deleted message!")
			console.log(error)
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
                    console.log(error);
                }
            }
           	//console.log("[messagedeletion] Debug: event ran " + args[0]["type"]);
            return orig(...args);
        });
    },
    onUnload() {
        unpatch();
        clearInterval(untimeout);
    }
};
