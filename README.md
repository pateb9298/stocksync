# StockSync
StockSync is a Python-based web platform that helps companies list, discover, and exchange spare parts across industries. It reduces excess inventory and procurement delays by connecting organizations with matching components, whether for sale, trade, or donation.

## Features

- CRUD operations for stocks
- JWT-based authentication
- React frontend served by Flask backend
- MySQL database

## Prerequisites

- Python 3.10+
- Node.js 18+
- MySQL (if running locally)
- Docker & Docker Compose (if using Docker)

## Environment Variables

Create a env file in the project root:

env
JWT_SECRET_KEY=super-secret-key
DB_USER=user
DB_PASSWORD=userpassword
DB_NAME=stocksync
DB_HOST=localhost

## Running Locally (Without Docker)

1. Clone the repository
git clone https://github.com/YOUR_USERNAME/stocksync.git
cd stocksync

2. Set up Python backend:
cd backend  # or wherever your Flask app is
python -m venv venv
source venv/bin/activate      # Linux/macOS
venv\Scripts\activate         # Windows
pip install -r requirements.txt

3. Run Flask backend
python run.py

4. Set up React frontend
cd ../stocksync-app
npm install
npm start

Your app will now run at http://localhost:3000

## Running with Docker

1. Build and Start Containers
Make sure your .env is in the project root
Run:
docker-compose build
docker-compose up

Your frontend will now run at http://localhost:5000
