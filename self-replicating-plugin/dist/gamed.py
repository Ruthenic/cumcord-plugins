from flask import Flask
from flask import send_file

app = Flask(__name__)

@app.route("/<path:text>")
def meme(text):
    return send_file(text.split('/')[1])
