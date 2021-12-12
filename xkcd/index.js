let unpatch = {
	newest: null,
	byid: null
};

async function fetchCORS(url) {
	return await fetch(`https://cors.smartfridge.space/${url}`)
}

function parseXKCD(xkcd) {
	let obj = {
		alt: xkcd["alt"],
		img: xkcd["img"],
		title: xkcd["title"],
		link: `https://xkcd.com/${xkcd["num"].toString()}`
	}
	return obj
}

async function getNewestXKCD() {
	let xkcd = await fetchCORS("xkcd.com/info.0.json")	
	xkcd = await xkcd.json()
	xkcd = parseXKCD(xkcd)
	return xkcd
}

async function getByIdXKCD(id) {
	let xkcd = await fetchCORS(`xkcd.com/${id.toString()}/info.0.json`)
	console.log(xkcd)
	if (!xkcd.ok) {
		return false
	}
	try {
		xkcd = await xkcd.json()
	} catch { return false }
	xkcd = parseXKCD(xkcd)
	return xkcd
}

export default {
    onLoad() {
		unpatch.newest = cumcord.commands.addCommand({
			name: "xkcd",
			description: "Sends the newest XKCD comic.",
			args: [],
			handler: async (ctx, send) => {
				let xkcd = await getNewestXKCD()
				console.log(xkcd)
				return `${xkcd["title"]} - ${xkcd["alt"]}\n${xkcd["img"]}`
			}
		})
		unpatch.byid = cumcord.commands.addCommand({
			name: "xkcd-by-id",
			description: "Sends the XKCD comic with the provided ID.",
			args: [{
				name: "id",
				description: "The ID of the XKCD comic you want to send.",
				type: "string",
				required: true
			}],
			handler: (ctx, send) => {
				let xkcd = getByIdXKCD(ctx.args.id)["link"]
				if (xkcd === false) send("The requested comic does not exist!")
				else {
					return `${xkcd["title"]} - ${xkcd["alt"]}\n${xkcd["img"]}`
				}
			}
		})

    },
    onUnload() {
        unpatch.newest()
		unpatch.byid()
    }
};
