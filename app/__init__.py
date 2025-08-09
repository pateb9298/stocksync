#this file makes app/ a Python package and intializes your Flask apps
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:365Pass@localhost/stocksync_db'
app.config['SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)

from app import routes  # Import routes after app and db are created
