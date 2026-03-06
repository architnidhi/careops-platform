from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "CareOps API is running", "status": "healthy"})

@app.route('/api/patients', methods=['GET'])
def get_patients():
    return jsonify({"patients": [], "message": "API ready - database coming soon"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
