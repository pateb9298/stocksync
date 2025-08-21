import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import pytest
from app import app, db
from app.models import User
from app.routes import Product
from werkzeug.security import generate_password_hash

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.drop_all()
            db.create_all()
        yield client
        with app.app_context():
            db.drop_all()

def test_add_part(client):
    # Create test user
    with app.app_context():
        user = User(
            username="testuser",
            email="testuser@example.com",
            first_name="Test",
            last_name="User",
            password=generate_password_hash("testpass")
        )
        db.session.add(user)
        db.session.commit()

    # Login to get JWT
    login_resp = client.post("/login", json={
        "username": "testuser",
        "password": "testpass"
    })
    assert login_resp.status_code == 200
    token = login_resp.get_json()["access_token"]

    # POST to /add_part
    response = client.post(
        "/add_part",
        json={
            "part_name": "GPU",
            "category": "Hardware",
            "model_number": "RTX-4090",
            "manufacturer": "Nvidia",
            "condition": "New",
            "quantity": 5,
            "specs": "16GB GDDR6X",
            "listing_title": "High-end Nvidia GPU",
            "listing_type": "Sell",
            "price": 1499.99,
            "currency": "USD",
            "location": "Warehouse A",
            "availability": "In Stock",
            "notes": "Test notes",
            "image": None
        },
        headers={"Authorization": f"Bearer {token}"}
    )

    # Assert success
    assert response.status_code == 201
    data = response.get_json()
    assert "Part added successfully" in data["message"]
    assert "id" in data


def test_edit_part(client):
    with app.app_context():
        # Create test user
        user = User(
            username="testuser",
            email="testuser@example.com",
            first_name="Test",
            last_name="User",
            password=generate_password_hash("testpass")
        )
        db.session.add(user)
        db.session.commit()

        # Create a part to edit
        part = Product(
            user_id=user.id,
            part_name="Old GPU",
            category="Hardware",
            model_number="RTX-3080",
            manufacturer="Nvidia",
            condition="Used",
            quantity=2,
            specs="10GB GDDR6X",
            listing_title="Old Nvidia GPU",
            listing_type="Sell",
            price=699.99,
            currency="USD",
            location="Warehouse B",
            availability="In Stock",
            notes="Old notes",
            image=None
        )
        db.session.add(part)
        db.session.commit()
        part_id = part.id  # Save this ID to edit later

    # Log in to get JWT
    login_resp = client.post("/login", json={
        "username": "testuser",
        "password": "testpass"
    })
    assert login_resp.status_code == 200
    token = login_resp.get_json()["access_token"]

    # Edit the part
    response = client.post("/edit_part", json={
        "id": part_id,
        "part_name": "GPU",
        "category": "Hardware",
        "model_number": "RTX-4090",
        "manufacturer": "Nvidia",
        "condition": "New",
        "quantity": 5,
        "specs": "16GB GDDR6X",
        "listing_title": "High-end Nvidia GPU",
        "listing_type": "Sell",
        "price": 1499.99,
        "currency": "USD",
        "location": "Warehouse A",
        "availability": "In Stock",
        "notes": "Test notes",
        "image": None
    }, headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 200
    data = response.get_json()
    assert "Part updated successfully" in data["message"]

def test_get_parts(client):

    with app.app_context():
        user = User(
            username="testuser",
            email="testuser@example.com",
            first_name="Test",
            last_name="User",
            password=generate_password_hash("testpass")
        )

        db.session.add(user)
        db.session.commit()
        user_id = user.id

        product = Product(
            user_id=user.id,
            part_name="Test Part",
            category="Hardware",
            model_number="TP-1234",
            manufacturer="Test Manufacturer",
            condition="New",
            quantity=10,
            specs="Test Specs",
            listing_title="Test Listing",
            listing_type="Sell",
            price=99.99,
            currency="USD",
            location="Test Location",
            availability="In Stock",
            notes="Test Notes",
            image=None
        )

        db.session.add(product)
        db.session.commit()

        login_resp = client.post("/login", json={
        "username": "testuser",
        "password": "testpass"
    })
    assert login_resp.status_code == 200
    token = login_resp.get_json()["access_token"]


    response = client.get("/get_parts", query_string = {"user_id": user_id}, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(part["part_name"] == "Test Part" for part in data)

    def test_signup_and_login(client):
        response = client.post("/signup", json={
            "username": "newuser",
            "email": "newuser@example.com",
            "first_name": "New",
            "last_name": "User",
            "password": "password123"
        })

        assert response.status_code==201
        assert "User created successfully" in response.get_json()["message"]

        response = client.post("/login", json={
            "username": "newuser",
            "password": "password123"
        })

        assert response.status_code == 200
        token = response.get_json()["access_token"]
        assert token is not None


def test_contact(client):
    with app.app_context():
        user = User(
            username="testuser",
            email="test3@example.com",
            first_name="Test3",
            last_name="User3",
        )
        db.session.add(user)
        db.commit()
        user_id = user.id

    response = client.post("/contact", json={"user.id":user_id})
    assert response.status_code ==200
    assert response.get_json()["email"] == "contact@example.com"

def test_search(client):
    with app.app_context():
        user = User(
            username="testuser",
            email="search@example.com",
            first_name="Search",
            last_name="User",
            password = generate_password_hash("searchpass")
        )
        db.session.add(user)
        db.session.commit()

        product = Product(
            user_id=user.id,
            part_name="Searchable GPU",
            category="Hardware",
            model_number="SP-1234",
            manufacturer="Search Manufacturer",
            condition="New",
            quantity=10,
            specs="Search Specs",
            listing_title="Search Listing",
            listing_type="Sell",
            price=99.99,
            currency="USD",
            location="Search Location",
            availability="In Stock",
            notes="Search Notes",
            image=None
        )
        db.session.add(product)
        db.session.commit()

    response = client.post("/search_item", json = {"search_term": "Searchable"})
    assert response.status_code ==200
    data = response.get_json()
    assert isinstance(data, list)
    assert any(part["part_name"] == "Searchable GPU" for part in data)



def test_delete_part(client):
    with app.app_context():
        user = User(
            username="testuser",
            email="delete@example.com",
            first_name="Delete",
            last_name="User",
            password=generate_password_hash("deletepass")
        )
        db.session.add(user)
        db.session.commit()

        product = Product(
            user_id=user.id,
            part_name="Deletable Part",
            category="Hardware",
            model_number="DP-1234",
            manufacturer="Delete Manufacturer",
            condition="New",
            quantity=10,
            specs="Delete Specs",
            listing_title="Delete Listing",
            listing_type="Sell",
            price=99.99,
            currency="USD",
            location="Delete Location",
            availability="In Stock",
            notes="Delete Notes",
            image=None
        )
        db.session.add(product)
        db.session.commit()
        part_id = product.id

    response = client.post("/delete_part", json={"id": part_id})
    assert response.status_code == 200
    assert "Part deleted successfully" in response.get_json()["message"]

    with app.app_context():
        assert Product.query.get(part_id) is None