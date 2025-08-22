# Backend Dockerfile for Render
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install netcat (needed for wait-for-db.sh)
RUN apt-get update && apt-get install -y netcat-openbsd bash && rm -rf /var/lib/apt/lists/*

# Copy wait-for-db script and make it executable
COPY wait-for-db.sh .
RUN chmod +x wait-for-db.sh

# Copy backend source code
COPY ./app ./app

# Copy prebuilt React frontend
COPY ./stocksync-app/build ./stocksync-app/build

# Expose Flask port
EXPOSE 5000

# Run Flask app after waiting for DB
CMD ["./wait-for-db.sh", "db", "python", "-m", "flask", "--app=app", "run", "--host=0.0.0.0", "--port=5000"]


# # Backend Dockerfile
# FROM python:3.10-slim

# # Set working directory
# WORKDIR /app

# # Install dependencies
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Install netcat for wait-for-db.sh
# RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# # Copy wait-for-db script and make it executable
# COPY wait-for-db.sh .
# RUN chmod +x wait-for-db.sh

# # Copy backend source code
# COPY ./app ./app

# # Copy React frontend build into the backend container
# COPY ./stocksync-app/build ./stocksync-app/build

# # Expose Flask port
# EXPOSE 5000

# # Run Flask app after waiting for DB
# CMD ["./wait-for-db.sh", "db", "python", "-m", "flask", "--app", "app", "run", "--host=0.0.0.0", "--port=5000"]
