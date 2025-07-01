import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'super-secret'
    SQLALCHEMY_DATABASE_URI = 'postgresql://chama_user:your_strong_password@localhost:5432/chama_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your-jwt-secret-key'
