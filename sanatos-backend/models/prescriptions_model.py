from models.database import db
from sqlalchemy.orm import relationship

class Prescription(db.Model):
    id = db.Column('prescription_id', db.Integer, primary_key=True, autoincrement=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    patient = relationship('Patient', back_populates='prescriptions')
    doctor_name = db.Column(db.String, nullable=False)
    medication = db.Column(db.String, nullable=False)
    dosage = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String, nullable=False)
    issue_date = db.Column(db.Date, nullable=False)
    expiration_date = db.Column(db.Date, nullable=False)

    def __init__(self, patient_id, doctor_name, medication, dosage, instructions, issue_date, expiration_date):
        self.patient_id = patient_id
        self.doctor_name = doctor_name
        self.medication = medication
        self.dosage = dosage
        self.instructions = instructions
        self.issue_date = issue_date
        self.expiration_date = expiration_date
