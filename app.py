# import os

# api_key = os.getenv("MBTA_API_KEY")
# print(api_key)

from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"