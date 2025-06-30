from flask import Flask
from flask_cors import CORS
from routes import bp

app = Flask(__name__)
CORS(app)

# Register routes from Blueprint (no url_prefix)
app.register_blueprint(bp)

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
