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
    id = db.Column(db.Integer, primary_key = True) 
    name = db.Column(db.String(100), nullable = False)
    stock = db.Column(db.Integer, nullable = False)

    #Representation method, useful for debugging 
    def __repr__(self):
        return f"<Product {self.name}>"
    
# Create all tables in the database if they don’t already exist
# This makes sure the Product table is actually created
with app.app_context():
    db.create_all()

# Route to handle form submissions from your HTML (localhost:5000) FLASK
#Users submit via a POST request to /add_part
@app.route('/add_part', methods = ['POST'])
def add_part():
    if request.method == 'POST':
        #Get data from the form submitted via POST
        id = request.form.get("id")
        name = request.form.get("name")
        stock = request.form.get("stock")

        if not id:
            flash('ID IS REQUIRED!')
        elif not name:
            flash('NAME IS REQUIRED')

        # If all data is present, create a Product and add to database
        if stock != '' and name != '' and id is not None:
            p = Product(id =id, name = name, stock = stock)
            db.session.add(p) # Stage the new product to be inserted
            db.session.commit() # Commit changes to the database
            return redirect('/') # Redirect back to home page
        else:
            return redirect('/') # Redirect even if validation fails

# API route to handle JSON requests from React (localhost:3000)

@app.route('/api/products', methods=['POST'])
# Get JSON data from the request body
def add_product():
    data = request.json
    id = data.get("id")
    name = data.get("name")
    stock = data.get("stock")

    # Validate JSON data
    if not id or not name or stock is None:
        # Return error as JSON if fields are missing
        #jsonify is a Flask helper function that converts a Python dictionary into a JSON response that the client (like your React app) can understand.
        return jsonify({"error": "Missing fields"}), 400

    # Create a Product and add to database
    p = Product(id=id, name=name, stock=stock)
    db.session.add(p)
    db.session.commit()

    # Return a success message in JSON format
    return jsonify({"message": "Product added successfully"}), 201


# Route for the home page
# Renders index.html template when someone visits localhost:5000/
@app.route('/')
def index():
    return render_template('index.html')

# Run the Flask app
# debug=True means the server reloads automatically when you change code
# if __name__ == "__main__":
#     app.run(debug=True)




