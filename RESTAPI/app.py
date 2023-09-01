import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS

TABLE_NAME = "test"

CREATE_ROOMS_TABLE = (
    f"CREATE TABLE IF NOT EXISTS {TABLE_NAME} (id SERIAL PRIMARY KEY, dataName TEXT);"
)

CREATE_TEMPS_TABLE = f""""CREATE TABLE IF NOT EXISTS temperatures (room_id INTEGER, temperature REAL,
date TIMESTAMP, FOREIGN KEY(room_id) REFERENCES {TABLE_NAME}(id) ON DELETE CASCADE);)"""

INSERT_ROOOM_RETURN_ID = f"INSERT INTO {TABLE_NAME} (dataName) VALUES (%s) RETURNING id;"
INTERT_TEMP = (
    "INSERT INTO temperatures (room_id, temperature, date) VALUES (%s, %s, %s);"
)

GLOBAL_NUMBER_OF_DAYS = (
    """SELECT COUNT (DISTINCT DATE(date)) AS days FROM temperatures;"""
)
GLOBAL_AVG = """SELECT AVG(temperature) as average FROM temperatures;"""

load_dotenv()

app = Flask(__name__)
cors = CORS(app)
url = os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

@app.get("/")
def home():
    return "Hello world!"

@app.post(f"/api/{TABLE_NAME}")
def create_test():
    data = request.get_json()
    dataName = data["dataName"]
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_ROOMS_TABLE)
            cursor.execute(INSERT_ROOOM_RETURN_ID, (dataName,))
            room_id = cursor.fetchone()[0]
    return {"id": room_id, "message": f"Room {dataName} created."}, 201