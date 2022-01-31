import {webpackModules} from "@cumcord/modules";

let unpatch;

let generate = async prompt1 => {
	let info = {
		prompt: prompt1,
		temperature: 1,
		top_k: 40,
		top_p: 0.9,
		seed: 0,
		stream: false
	}
	//TODO: use better cors proxy for release
	let res = await fetch("https://cors.smartfridge.space/bellard.org/textsynth/api/v1/engines/gptj_6B/completions", {
	  "headers": {
		"accept": "*/*",
		"accept-language": "en-US,en;q=0.9",
		"content-type": "application/json",
		"sec-ch-ua": "\";Not A Brand\";v=\"99\", \"Chromium\";v=\"94\"",
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": "\"Linux\"",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "no-cors",
		"sec-fetch-site": "same-origin"
	  },
	  "referrer": "https://bellard.org/textsynth/",
	  "referrerPolicy": "strict-origin-when-cross-origin",
	  //"body": "{\"prompt\":\"Hello, world!\",\"temperature\":1,\"top_k\":40,\"top_p\":0.9,\"seed\":0,\"stream\":true}",
	  "body": JSON.stringify(info),
	  "method": "POST",
	  "type": "no-cors"
	});
	let i = "[Copilot] Message to make this unminify.";
	console.log(i) //the bundler breaks shit if this isn't here
	console.log(res)
	return await res.JSON()
}

export default {
    onLoad() {
        unpatch = cumcord.patcher.after("sendMessage", webpackModules.findByProps("sendMessage"), (args) => {
			args[1].content = args[1].content + generate(args[1].content)["text"]
        });
    },
    onUnload() {
        unpatch();
    }
};
