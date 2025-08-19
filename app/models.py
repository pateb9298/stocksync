#defines your database models (tables and columns)
#You will use this to tell Flask (with SQLAlchemy) what kind of data to store

#Example
from app import app, db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    # Passwords should be hashed in production, this is just for simplicity
    # Use libraries like bcrypt or werkzeug.security for hashing    
    password = db.Column(db.String(120), nullable=False)

    def setPassword(self, password):
        self.password = generate_password_hash(password)
    
    def checkPassword(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return f"<User {self.username}>"