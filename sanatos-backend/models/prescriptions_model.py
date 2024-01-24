from models.database import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Prescription(db.Model):
    id = db.Column('prescription_id', db.Integer, primary_key=True, autoincrement=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.doctor_id'), nullable=False)
    medication = db.Column(db.String, nullable=False)
    dosage = db.Column(db.String, nullable=False)
    duration = db.Column(db.String, nullable=False)

    def __init__(self, patient_id, doctor_id, medication, dosage, duration):
        self.patient_id = patient_id
        self.doctor_id = doctor_id
        self.medication = medication
        self.dosage = dosage
        self.duration = duration
