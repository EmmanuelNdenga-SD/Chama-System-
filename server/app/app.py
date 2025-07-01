from flask import Flask  # ✅ REQUIRED
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from .models import db
from .routes import bp
from server.app.config import Config  # ✅ Make sure this is correct

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    JWTManager(app)
    app.register_blueprint(bp)

    return app
