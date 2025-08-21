import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import pytest
from app import app, db
from app.models import User
from app.routes import Product

#A fixture is like a setup/teardown method that runs before each test
#It gives us a temporary client to send HTTP requests to our Flask app

@pytest.fixture
def client():
    #Enable testing mode (Flask disables error catching in test mode)
    app.config['TESTING'] = True
    #Use an in-memory SQLite database (does not touch your real database, resets on each test)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    #Create a test client that simulates sending requests to your app
    with app.test_client() as client:
        #Push an application context (so Flask knows which app/db we are working with)
        with app.app_context():
            db.create_all()
        yield client #Hand this test client to the test function

        #After the test is done, clean up
        with app.app_context():
            db.drop_all()


from werkzeug.security import generate_password_hash

#TEST#1 Add a new part
def test_add_part(client):
    #Create a test user
    with app.app_context():
        user = User(
            username="testuser",
            email="testuser@example.com",      # required
            first_name="Test",                 # if required
            last_name="User",                  # if required
            password=generate_password_hash("testpass")
        )
        db.session.add(user)
        db.session.commit()

    login_resp = client.post("/login", json={
        "username": "testuser",
        "password": "testpass"
    })

    assert login_resp.status_code == 200
    token = login_resp.json["access_token"]

    #Send a POST request to the /add_part endpoint with JSON data for the new part
    response = client.post(
    "/add_part",
    json={
        "part_name": "GPU",
        "category": "Hardware",
        "condition": "New",
        "quantity": 5,
        "location": "Warehouse A",
        "availability": "In Stock",
        "notes": "Test notes",
        "image": None
    },
    headers={"Authorization": f"Bearer {token}"}
)

    #Make sure the request succeeded (HTTP 200)
    assert response.status_code == 200
    #Convert response JSON into a Python dict
    data = response.get_json()
    #Check that the response contains the sucess message
    
    assert "Part added successfully" in data["message"]
