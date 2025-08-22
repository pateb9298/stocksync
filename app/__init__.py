from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy


app = Flask(
    __name__,
    static_folder='../stocksync-app/build/static',  # adjust path if needed
    template_folder='../stocksync-app/build'
)

# Get MySQL credentials from environment variables
db_user = os.environ.get("MYSQL_USER", "user")
db_password = os.environ.get("MYSQL_PASSWORD", "userpassword")
db_host = os.environ.get("MYSQL_HOST", "db")
db_name = os.environ.get("MYSQL_DATABASE", "stocksync")

# Correct database URI for Docker
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:3306/{db_name}"

app.config['SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)

# Import routes after initializing app and db
from app import routes
