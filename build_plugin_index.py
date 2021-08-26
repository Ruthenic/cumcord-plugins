import json, sys
# Licensed under WTFPL, please steal for your own plugin websites

def build_html(name, author, description, license, folder):
    return """
    <head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@300&display=swap');
            *{font-family: 'Azeret Mono', monospace;}
        </style>
        <script>var timesClicked = 0;</script>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    </head>""" + f"""<body><a href='..'>Back to Home</a><h1>{name}</h1><h4>by {author}<hr></h4><p>{description}</p><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script><script>function copyLink()""" + """{let loc = window.location.href.replace("index.html", "");navigator.clipboard.writeText(loc);Toastify({text: "Copied link to clipboard!", "background-color": "#404040", gravity: "bottom", position: "right"}).showToast();timesClicked++;}</script><button style='position: absolute; bottom: 5px;' onclick='copyLink()'>Add to Cumcord</button></body>"""
imp, out, folder = sys.argv[1], sys.argv[2], sys.argv[3]
imp = json.load(open(imp))
print(imp)
html = build_html(imp["name"], imp["author"], imp["description"], imp["license"], folder)
with open(out, "w") as f:
    f.write(html)
