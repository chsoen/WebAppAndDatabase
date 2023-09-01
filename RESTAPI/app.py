import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS

TABLE_NAME = "test"

CREATE_TEST_TABLE = (
    f"CREATE TABLE IF NOT EXISTS {TABLE_NAME} (id SERIAL PRIMARY KEY, dataName TEXT);"
)
INSERT_ENTRY_RETURN_ID = f"INSERT INTO {TABLE_NAME} (dataName) VALUES (%s) RETURNING id;"

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
            cursor.execute(CREATE_TEST_TABLE)
            cursor.execute(INSERT_ENTRY_RETURN_ID, (dataName,))
            room_id = cursor.fetchone()[0]
    return {"id": room_id, "message": f"Entry {dataName} created."}, 201