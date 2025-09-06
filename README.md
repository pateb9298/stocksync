# StockSync
StockSync is a Python-based web platform that helps companies list, discover, and exchange spare parts across industries. By connecting organizations with matching components, StockSync reduces excess inventory, procurement delays, and wasted storage space. Companies can buy, sell, trade, or donate spare parts efficiently, even for niche or industry-specific components.

## Features

- Centralized marketplace for inter-company spare part trading
- CRUD operations for spare parts listings
- JWT-based authentication and secure user accounts
- React frontend served via Flask backend
- MySQL database integration
- Upload photos and details for parts
- Search and filter by category, condition, manufacturer, model, and location
- Track inventory value and recent activity
- Add, edit, or delete your listings easily

## Tech Stack
- Backend: Python (Flask)
- Frontend: React.js
- Database: MySQL, SQLAlchemy
- Containerization: Docker & Docker Compose

## Demo Screenshots
![Demo Part](https://github.com/pateb9298/stocksync/blob/main/StockSyncScreen1.jpeg)
![Demo Part](https://github.com/pateb9298/stocksync/blob/main/StockSyncScreen2.jpeg)
![Demo Part](https://github.com/pateb9298/stocksync/blob/main/StockSyncScreen3.jpeg)


## Prerequisites
- Docker & Docker Compose installed

## Environment Variables
Create a .env file in the project root. You can use the following as a starting point: \
```
JWT_SECRET_KEY=super-secret-key
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=stocksync
DB_HOST=db
DB_PORT=3306
```
IMPORTANT:
- DB_HOST and DB_PORT must stay as db and 3306: this allows the backend container to connect to the MySQL container inside Docker.
- DB_USER, DB_PASSWORD, DB_NAME can be changed, but if you do, make sure the same values are used in the db service in your docker-compose.yml.
- JWT_SECRET_KEY can be changed freely; it is used for authentication security.
- Users do not need to install MySQL locally: Docker will run the MySQL container automatically

## Running with Docker

1. Build and Start Containers
Make sure your .env is in the project root
- Build the containers
```
docker-compose build
```
- Start the containers
```
docker-compose up
```
Your app will now run at http://localhost:5000
