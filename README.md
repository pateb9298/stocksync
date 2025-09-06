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
- Backend: Flask, Python, SQLAlchemy, JWT
- Frontend: React, HTML/CSS, JavaScript
- Database: MySQL (or Docker MySQL container)
- Containerization (optional): Docker & Docker Compose

## Demo Screenshots
![Demo Part](https://github.com/pateb9298/stocksync/blob/main/StockSyncScreen1.jpeg)
![Demo Part](https://github.com/pateb9298/stocksync/blob/main/StockSyncScreen2.jpeg)
![Demo Part](https://github.com/pateb9298/stocksync/blob/main/StockSyncScreen3.jpeg)


## Prerequisites
- Python 3.10+
- Node.js 18+
- MySQL (if running locally)
- Docker & Docker Compose (if using Docker)

## Environment Variables

Create a env file in the project root:\

env:
- JWT_SECRET_KEY=super-secret-key
- DB_USER=user
- DB_PASSWORD=userpassword
- DB_NAME=stocksync
- DB_HOST=localhost

## Running with Docker

1. Build and Start Containers
Make sure your .env is in the project root
Run:
```
docker-compose build
```
```
docker-compose up
```
Your frontend will now run at http://localhost:5000
