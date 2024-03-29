# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models.database import db

def create_app():
    app = Flask(__name__)
    CORS(app)
    # Configure SQLAlchemy to use SQLite
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
    db.init_app(app)
    return app

if __name__ == "__main__":
    app = create_app()
    import controllers.doctor_controller
    import controllers.patient_controller
    import controllers.login_controller
    app.run()
