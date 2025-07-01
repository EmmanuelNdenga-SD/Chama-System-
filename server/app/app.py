# server/app/app.py

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

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)

    # ✅ CORS setup — supports credentials & Vercel origin
    CORS(app, supports_credentials=True, resources={
        r"/api/*": {
            "origins": [
                "https://chama-system-2ryw.vercel.app",  # ✅ Production frontend
                "http://localhost:5174"                   # ✅ Local development
            ]
        }
    })

    # Register Blueprint
    app.register_blueprint(bp)

    return app
