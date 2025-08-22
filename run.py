from app import app #imports from app folder

# Run the Flask app
# debug=True means the server reloads automatically when you change code
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
