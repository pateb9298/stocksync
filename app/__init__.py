import os
from dotenv import load_dotenv
from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(
    __name__,
    static_folder='../stocksync-app/build/static',  # adjust path if needed
    template_folder='../stocksync-app/build'
)

# Get MySQL credentials from environment variables
DB_USER = os.environ.get("DB_USER", "root")
DB_USER = os.environ.get("DB_PASSWORD", "")
DB_HOST = os.environ.get("DB_HOST", "localhost")
DB_HOST = os.environ.get("DB_NAME", "stocksync")

# Correct database URI for Docker
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{DB_USER}:{DB_USER}@{DB_HOST}:3306/{DB_HOST}"

app.config['SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)

# Import routes after initializing app and db
from app import routes
