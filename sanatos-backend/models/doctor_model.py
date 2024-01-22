from models.database import db
from werkzeug.security import generate_password_hash, check_password_hash


class Doctor(db.Model):
    id = db.Column('doctor_id',db.Integer, primary_key=True, autoincrement = True)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    specialization = db.Column(db.String, nullable=False)
    license_number = db.Column(db.Integer, nullable=False)

    def __init__(self, username, password, first_name, last_name, email, phone_number, specialization, license_number):
        self.username = username
        self.password = generate_password_hash(password)
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone_number = phone_number
        self.specialization = specialization
        self.license_number = license_number

    def check_password(self, password):
        """Check if the provided password matches the stored hash."""
        return check_password_hash(self.password, password)

    
