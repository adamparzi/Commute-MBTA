from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, emit
from azure.identity import ClientSecretCredential
from azure.keyvault.secrets import SecretClient
from dotenv import load_dotenv
import os
import requests

load_dotenv()

client_id = os.environ['AZURE_CLIENT_ID']
tenant_id = os.environ['AZURE_TENANT_ID']
client_secret = os.environ['AZURE_CLIENT_SECRET']
vault_url = os.environ["AZURE_VAULT_URL"]

secret_name = "mbta-api"

credentials = ClientSecretCredential(
    client_id=client_id,
    tenant_id=tenant_id,
    client_secret=client_secret
)

secret_client = SecretClient(vault_url=vault_url, credential = credentials)
mbtaAPI = secret_client.get_secret(secret_name)

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('request_data')
def handle_request_data(json):
    line = json.get('line')     #line is the key for the mbta line (ex. 'line': 'Green B')
    if not line:
        return

    url = f"https://api-v3.mbta.com/vehicles?api_key={mbtaAPI.value}&filter[route]={line}"
    response = requests.get(url)
    data = response.json()['data']

    emit('new_data', data)  # Send the data back to the client

if __name__ == '__main__':
    socketio.run(app, debug=True)


