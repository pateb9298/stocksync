# Backend Dockerfile
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install dependencies needed for Node.js setup and building
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    ca-certificates \
    lsb-release \
    build-essential \
    netcat-openbsd \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 18 and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && rm -rf /var/lib/apt/lists/*

# Copy wait-for-db script and make it executable
COPY wait-for-db.sh .
RUN chmod +x wait-for-db.sh

# Copy backend source code
COPY ./app ./app

# Copy React frontend source code
COPY ./stocksync-app ./stocksync-app

# Build React frontend
RUN cd stocksync-app && npm install && npm run build

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
