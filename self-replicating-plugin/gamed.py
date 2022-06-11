from flask import Flask
from flask import send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/<path:text>")
def meme(text):
    return send_file('dist/' + text.split('/')[1])
