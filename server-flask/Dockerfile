# Use the official Python image from DockerHub
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install system dependencies (e.g., gcc for compiling Python libraries)
RUN apt-get update && apt-get install -y --no-install-recommends gcc

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files into the container
COPY src/* .

# Expose the port the app will run on (default Flask port)
EXPOSE 5000

# Set environment variables (e.g., Flask app entry point)
ENV FLASK_APP=server.py

# Command to run the Flask app
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--debug"]