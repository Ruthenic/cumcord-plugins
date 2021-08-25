import os, json, sys
# Licensed under WTFPL, please steal for your own plugin websites

def build_html(plugins):
    html = "<head><style>@import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:wght@300&display=swap');*{font-family: 'Azeret Mono', monospace;}</style></head><body>"
    for plugin in plugins:
        html += f"<a href='{plugin}'>{plugin}</a><br>"
    return html + "</body>"

plugins = os.listdir()
blacklisted_terms = ["LICENSE", "CNAME", "build_index.py", "build_plugin_index.py", "index.html", ".git", ".gitignore", ".github"]
n = 0
for i in blacklisted_terms:
    try:
        plugins.remove(i)
    except:
        pass

html = build_html(plugins)
with open("index.html", "w") as f:
    f.write(html)
