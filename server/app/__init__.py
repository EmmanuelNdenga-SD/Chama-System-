from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from .models import db
from .routes import bp
from .config import Config  # Fixed import to be relative (single-dot)

def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)
    CORS(app)

    # Register blueprint
    app.register_blueprint(bp)

    return app
