#Contains all my Flask routes and sets up the web server

#Import Flask classes and helpers
from flask import render_template, request, flash, redirect, jsonify

#CORS allows the frontend (React on port 3000) to communicate with this backend
from flask_cors import CORS

#Import the Flask app and db object from your __init__.py
from app import app, db

#Initialize CORS for this app, allowing requests from React running on localhost:3000
CORS(app, origins=["http://localhost:3000"])


#Defines a Product model for SQLALchemy and tells the database how the product table should look
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    part_name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=True)
    model_number = db.Column(db.String(100), nullable=True)
    manufacturer = db.Column(db.String(100), nullable=True)
    condition = db.Column(db.String(50), nullable=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    specs = db.Column(db.Text, nullable=True)
    listing_title = db.Column(db.String(150), nullable=False)
    listing_type = db.Column(db.String(50), nullable=True)
    price = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), nullable=True)
    location = db.Column(db.String(100), nullable=True)
    availability = db.Column(db.String(50), nullable=True)
    notes = db.Column(db.Text, nullable=True)

    #Representation method, useful for debugging 
    def __repr__(self):
        return f"<Part {self.part_name} ({self.model_number})>"
    
# Create all tables in the database if they don’t already exist
# This makes sure the Product table is actually created
with app.app_context():
    db.drop_all()
    db.create_all()

# Route to handle form submissions from your HTML (localhost:5000) FLASK
#Users submit via a POST request to /add_part


@app.route('/add_part', methods = ['POST'])
def add_part():
    data = request.get_json()

    required_fields = ["part_name", "listing_title", "price"]
    for field in required_fields:
        if not data.get(field):
            return {"error": f"{field} is required"}, 400
        
        #Get data from the form submitted via POST
    new_part = Product(
        part_name=data.get("part_name"),
        category=data.get("category"),
        model_number=data.get("model_number"),
        manufacturer=data.get("manufacturer"),
        condition=data.get("condition"),
        quantity=data.get("quantity"),
        specs=data.get("specs"),
        listing_title=data.get("listing_title"),
        listing_type=data.get("listing_type"),
        price=data.get("price"),
        currency=data.get("currency"),
        location=data.get("location"),
        availability=data.get("availability"),
        notes=data.get("notes")
    )

    # If all data is present, create a Product and add to database
    db.session.add(new_part) # Stage the new product to be inserted
    db.session.commit() # Commit changes to the database
    return {"message": "Part added sucessfully", "id": new_part.id}, 201 # Redirect back to home pag

@app.route('/get_parts', methods=['GET'])
def get_parts():
    
# Route for the home page
# Renders index.html template when someone visits localhost:5000/
@app.route('/')
def index():
    return render_template('index.html')




