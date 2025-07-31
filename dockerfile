# Dockerfile
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Copy HTML and JS files
COPY . /app

# Expose port
EXPOSE 8000

# Run Python's built-in HTTP server
CMD ["python", "-m", "http.server", "8000"]
