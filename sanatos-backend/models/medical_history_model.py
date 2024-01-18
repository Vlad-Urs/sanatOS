from models.database import db

class MedicalHistory(db.Model):
    id = db.Column('history_id',db.Integer, primary_key=True, autoincrement = True)
    patient_id = db.Column(db.Integer, nullable=False)
    doctor_id = db.Column(db.Integer, nullable=False)
    history_text = db.Column(db.Text, nullable=False)
    entry_date = db.Column(db.Date, nullable=False)

    def __init__(self, patient_id, doctor_id, history_text, entry_date):
        self.patient_id = patient_id
        self.doctor_id = doctor_id
        self.history_text = history_text
        self.entry_date = entry_date