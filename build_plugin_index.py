import json, sys
# Licensed under WTFPL, please steal for your own plugin websites

def build_html(name, author, description, license, folder):
    return "<head><style>@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@300&display=swap');*{font-family: 'Azeret Mono', monospace;}</style></head>" + f"<body><a href='..'>Back to Home</a><h1>{name}</h1><h4>by {author}<hr></h4><p>{description}</p><a href='https://cumcord.ruthenic.com/{folder}' style='position: absolute; bottom: 5px;'>Add to Cumcord</a></body>"

imp, out, folder = sys.argv[1], sys.argv[2], sys.argv[3]
imp = json.load(open(imp))
print(imp)
html = build_html(imp["name"], imp["author"], imp["description"], imp["license"], folder)
with open(out, "w") as f:
    f.write(html)
