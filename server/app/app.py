from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from .models import db
from .routes import bp  # <- your Blueprint
from config import Config  # <- NOT from ..config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    app.register_blueprint(bp)  # ✅ REGISTER ROUTES

    return app
