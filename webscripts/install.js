function copyLink() {
    let loc = window.location.href.replace("index.html", "");
    let opts = {
    	action: "install_plugin",
    	id: "cum",
    	url: loc
    }
    let ccConn;
    ccConn = new WebSocket("ws://127.0.0.1:6463/cumcord") //TODO: automatically retry on next port if connection fails
    ccConn.onopen = (event) => {
    	ccConn.send(JSON.stringify(opts))
    }
    Toastify({
        text: "Sent URL to client!",
        "background-color": "#404040",
        gravity: "bottom",
        position: "right"
    }).showToast();
}
