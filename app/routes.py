# Contains all my Flask routes and sets up the web server

from flask import render_template, request, flash, redirect, jsonify
from app.models import User
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
from app import app, db

# JWT Setup
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "dev-secret-key")
jwt = JWTManager(app)

# Enable CORS for React frontend
CORS(app, supports_credentials=True, origins=["http://localhost:3000", "http://127.0.0.1:5000"])

# Product Model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
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
    image = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f"<Part {self.part_name} ({self.model_number})>"

# Ensure tables exist
with app.app_context():
    db.create_all()

# Routes
@app.route('/get_user', methods=['GET'])
@jwt_required()
def get_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return {"error": "User not found"}, 404

    return {
        "id": user.id,
        "username": user.username,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email
    }, 200

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    if not username or not password or not email:
        return {"error": "Username, password, and email are required"}, 400
    
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return {"error": "Username already exists. Please log in"}, 400
    
    new_user = User(
        username=username,  
        email=email,
        first_name=first_name,
        last_name=last_name
    )
    new_user.setPassword(password)
    db.session.add(new_user)
    db.session.commit()
    return {"message": "User created successfully"}, 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    password = data['password']

    if username:
        user = User.query.filter_by(username=username).first()
    elif email:
        user = User.query.filter_by(email=email).first()
    else:
        return {"error": "Username or email required"}, 400

    if not user or not user.checkPassword(password):
        return {"error": "Invalid username or password"}, 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify(access_token=access_token), 200

UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/contact", methods=["POST"])
def contact():
    data = request.get_json()
    user_id = data.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    userEmail = User.query.filter_by(id=user_id).first()
    userEmail = userEmail.email
    return jsonify({"email": userEmail}), 200

@app.route('/add_part', methods=['POST'])
@jwt_required()
def add_part():
    data = request.form  # <-- changed from request.form
    current_user_id = int(get_jwt_identity())

    # Optional image handling
    image_file = request.files.get("image")
    filename = None
    if image_file:
        filename = secure_filename(image_file.filename)
        image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        image_file.save(image_path)

    # Ensure required fields
    required_fields = ["part_name", "listing_title", "price"]
    for field in required_fields:
        if not data.get(field):
            return {"error": f"{field} is required"}, 400

    # Validate price
    try:
        price = float(data.get("price"))
    except (TypeError, ValueError):
        return {"error": "Price must be a valid number"}, 400

    # Validate quantity
    try:
        quantity = int(data.get("quantity", 1))
    except (TypeError, ValueError):
        return {"error": "Quantity must be an integer"}, 400

    # Create product
    new_part = Product(
        user_id=current_user_id,
        part_name=data.get("part_name"),
        category=data.get("category"),
        model_number=data.get("model_number"),
        manufacturer=data.get("manufacturer"),
        condition=data.get("condition"),
        quantity=quantity,
        specs=data.get("specs"),
        listing_title=data.get("listing_title"),
        listing_type=data.get("listing_type"),
        price=price,
        currency=data.get("currency"),
        location=data.get("location"),
        availability=data.get("availability"),
        notes=data.get("notes"),
        image=filename
    )

    db.session.add(new_part)
    db.session.commit()
    return {"message": "Part added successfully", "id": new_part.id}, 201


from flask import send_from_directory

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route('/edit_part', methods=['POST'])
def edit_part():
    data = request.get_json()
    part_id = data.get("id")
    part = Product.query.get(part_id)
    if not part:
        return {"error": "Part not found"}, 404

    # Update fields if they are provided in the request
    for field in ["part_name", "category", "model_number", "manufacturer", "condition", "quantity", "specs", "listing_title", "listing_type", "price", "currency", "location", "availability", "notes"]:
        if field in data:
            setattr(part, field, data[field])

    db.session.commit()

    return {"message": "Part updated successfully"}, 200

@app.route('/get_parts', methods=['GET'])
@jwt_required()
def get_parts():
    current_user_id = get_jwt_identity()
    parts = Product.query.filter_by(user_id=current_user_id).order_by(Product.id.desc()).all()
    result = []
    for part in parts:
        result.append({
            "id": part.id,
            "user_id": part.user_id,  # <-- add this
            "part_name": part.part_name,
            "category": part.category,
            "model_number": part.model_number,
            "manufacturer": part.manufacturer,
            "condition": part.condition,
            "quantity": part.quantity,
            "specs": part.specs,
            "listing_title": part.listing_title,
            "listing_type": part.listing_type,
            "price": part.price,
            "currency": part.currency,
            "location": part.location,
            "availability": part.availability,
            "notes": part.notes,
            "image": f"http://localhost:5000/uploads/{part.image}" if part.image else None
        })
    return jsonify(result)



@app.route('/getAll_parts', methods=['GET'])
@jwt_required()
def getAll_parts():
    current_user_id = get_jwt_identity()
    parts = Product.query.order_by(Product.id.desc()).all()
    result = []
    for part in parts:
        result.append({
            "id": part.id,
            "user_id": part.user_id,  # <-- add this
            "part_name": part.part_name,
            "category": part.category,
            "model_number": part.model_number,
            "manufacturer": part.manufacturer,
            "condition": part.condition,
            "quantity": part.quantity,
            "specs": part.specs,
            "listing_title": part.listing_title,
            "listing_type": part.listing_type,
            "price": part.price,
            "currency": part.currency,
            "location": part.location,
            "availability": part.availability,
            "notes": part.notes,
            "image": f"http://localhost:5000/uploads/{part.image}" if part.image else None
        })
    return jsonify(result)

    # conn = get_db_connection()
    # cursor = conn.cursor(dictionary=True)
    # cursor.execute("SELECT * FROM products ORDER BY data_listed DESC LIMIT 1")
    # part = cursor.fetchone()
    # cursor.close()
    # conn.close()
    # return jsonify(part)
    
@app.route('/search_item', methods=['POST'])
def search_item():
    data = request.get_json()
    term = data.get("search_term", "").strip()
    category = data.get("category", "").strip()
    condition = data.get("condition", "").strip()
    listing_type = data.get("listing_type", "").strip()
    location = data.get("location", "").strip()
    
    query = Product.query
    if term:
        query = query.filter(Product.part_name.ilike(f"%{term}%"))
    if category:
        query = query.filter(Product.category.ilike(f"%{category}%"))
    if condition:
        query = query.filter(Product.condition.ilike(f"%{condition}%"))
    if listing_type:
        query = query.filter(Product.listing_type.ilike(f"%{listing_type}%"))
    if location:
        query = query.filter(Product.location.ilike(f"%{location}%"))

    products = query.all()
    results = [
        {
            "id": p.id,
            "part_name": p.part_name,
            "listing_title": p.listing_title,
            "manufacturer": p.manufacturer,
            "model_number": p.model_number,
            "price": p.price,
            "listing_type": p.listing_type,
            "category": p.category,
            "condition": p.condition,
            "quantity": p.quantity,
            "location": p.location,
            "availability": p.availability,
            "notes": p.notes,
            "image": f"http://localhost:5000/uploads/{p.image}" if p.image else None
            # "date_listed": p.date_listed.isoformat() if hasattr(p, "date_listed") else None

        }
        for p in products
    ]
    return jsonify(results)


@app.route('/delete_part', methods=["POST"])
def delete_part():
    data = request.get_json()
    part_id = data.get("id")

    Product.query.filter_by(id=part_id).delete()
    db.session.commit()
    return {"message": "Part deleted successfully"}, 200

@app.errorhandler(Exception)
def handle_exception(e):
    import traceback
    print("🔥 ERROR TRACEBACK 🔥")
    traceback.print_exc()  # prints full error in terminal
    return {"error": str(e)}, 500

# Route for the home page
# Renders index.html template when someone visits localhost:5000/
from flask import send_from_directory

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.template_folder, path)):
        return send_from_directory(app.template_folder, path)
    else:
        return send_from_directory(app.template_folder, 'index.html')


