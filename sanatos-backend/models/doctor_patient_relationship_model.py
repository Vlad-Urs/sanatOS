from models.database import db

class DoctorPatientRelationship(db.Model):
    id = db.Column('relationship_id', db.Integer, primary_key=True, autoincrement = True)
    patient_id = db.Column(db.Integer, nullable = False)
    doctor_id = db.Column(db.Integer, nullable = False)

    def __init__(self, patient_id, doctor_id):
        self.patient_id = patient_id
        self.doctor_id = doctor_id