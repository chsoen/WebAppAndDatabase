import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS

TABLE_NAME = "test"

CREATE_TEST_TABLE = (
    f"CREATE TABLE IF NOT EXISTS {TABLE_NAME} (id SERIAL PRIMARY KEY, FirstName TEXT, LastName TEXT, Age INTEGER);"
)
INSERT_ENTRY_RETURN_ID = f"INSERT INTO {TABLE_NAME} (FirstName, LastName, Age) VALUES (%s, %s, %s) RETURNING id;"

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
    inputFirstName = data["inputFirstName"]
    inputLastName = data["inputLastName"]
    inputAge = data["inputAge"]
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_TEST_TABLE)
            cursor.execute(INSERT_ENTRY_RETURN_ID, (inputFirstName, inputLastName, inputAge))
            entry_id = cursor.fetchone()[0]
    return {"id": entry_id, "message": f"Entry {inputFirstName} created."}, 201