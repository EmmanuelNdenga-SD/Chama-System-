from flask import Flask
from flask_cors import CORS
from server.routes import bp  # <-- THIS LINE

app = Flask(__name__)
CORS(app)
app.register_blueprint(bp)

if __name__ == '__main__':
    app.run(debug=True)
# Optional: Debug endpoint
@app.route('/ping')
def ping():
    return { "pong": True }

# Debug route printing for Render logs
print("🔧 Registered routes:")
for rule in app.url_map.iter_rules():
    print(rule)

if __name__ == '__main__':
    app.run(debug=True)
