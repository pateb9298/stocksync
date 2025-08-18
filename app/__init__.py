#this file makes app/ a Python package and intializes your Flask apps - __init__ is a package

# Import the Flask class to create a Flask application
from flask import Flask

# Import SQLAlchemy to manage database operations in Flask
#SQLALchemy is an ORM (Object Relational Mapper) to work with databases in Python
from flask_sqlalchemy import SQLAlchemy

# Create a Flask app instance
app = Flask(__name__)
# Configure the database URI for SQLAlchemy
# Here, we are using MySQL with pymysql connector
# Replace 'password' with your MySQL password and 'stocksync_db' with your database name
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:365Pass@localhost/stocksync_db'

# Set a secret key for sessions, flash messages, and CSRF protection
app.config['SECRET_KEY'] = 'your_secret_key'

# Initialize SQLAlchemy with the Flask app
db = SQLAlchemy(app)

# Import the routes module AFTER creating app and db
# This ensures that Flask knows about your routes and the database when the app starts
from app import routes  
