from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .models import db
from .routes import bp
from server.app.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)

    # ✅ CORS Fix: Allow frontend (local + deployed) with full preflight config
    CORS(app, supports_credentials=True, resources={
        r"/api/*": {
            "origins": [
                "http://localhost:5174",
                "https://chama-system-2ryw.vercel.app"
            ],
            "allow_headers": ["Content-Type", "Authorization"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        }
    })

    JWTManager(app)
    app.register_blueprint(bp)

    return app
