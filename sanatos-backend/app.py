# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models.database import db
from flask_cors import CORS
from flask_talisman import Talisman

def create_app():
    app = Flask(__name__)

    talisman = Talisman(app)
 
    # Content Security Policy (CSP) Header
    csp = {
        'default-src': [
            '\'self\'',
            'https://code.jquery.com',
            'https://cdn.jsdelivr.net'
        ]
    }
    # HTTP Strict Transport Security (HSTS) Header
    hsts = {
        'max-age': 31536000,
        'includeSubDomains': True
    }
    # Enforce HTTPS and other headers
    talisman.force_https = True
    talisman.force_file_save = True
    talisman.x_xss_protection = True
    talisman.session_cookie_secure = True
    talisman.session_cookie_samesite = 'Lax'
    talisman.frame_options_allow_from = 'https://www.google.com'
    
    # Add the headers to Talisman
    talisman.content_security_policy = csp
    talisman.strict_transport_security = hsts

    CORS(app)
    # Configure SQLAlchemy to use SQLite
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'

    # Turn off Flask-SQLAlchemy's modification tracking feature. This feature is known to have security implications.
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    db.init_app(app)
    return app

if __name__ == "__main__":
    app = create_app()
    import controllers.doctor_controller
    import controllers.patient_controller
    import controllers.login_controller

    # should be used when not in development mode
    app.run(debug=False)
    
    app.run()