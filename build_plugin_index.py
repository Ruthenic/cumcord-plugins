import json, sys
# Licensed under WTFPL, please steal for your own plugin websites

def build_html(name, author, description, license):
    return "<head><style>@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@300&display=swap');*{font-family: 'Azeret Mono', monospace;}</style></head>" + f"<body><a href='..'>Back to Home</a><h1>{name}</h1><h4>by {author}</h4><p>{description}</p></body>"

imp, out = sys.argv[1], sys.argv[2]
imp = json.load(open(imp))
print(imp)
html = build_html(imp["name"], imp["author"], imp["description"], imp["license"])
with open(out, "w") as f:
    f.write(html)
