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
    app.run(debug=True)  # Enable debug mode for development

    db.init_app(app)
    Migrate(app, db)

    # ✅ Proper CORS setup
    cors = CORS(app, supports_credentials=True, resources={
        r"/api/*": {
            "origins": [
                "https://chama-system-2ryw.vercel.app",
                "http://localhost:5173"
            ]
        }
    })

    print("✅ CORS initialized for frontend origins.")

    JWTManager(app)
    app.register_blueprint(bp)

    return app
