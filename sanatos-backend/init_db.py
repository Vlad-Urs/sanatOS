import app
from app import db, create_app  
from datetime import date

# Import models
from models.doctor_model import Doctor
from models.patient_model import Patient
from models.medical_history_model import MedicalHistory
from models.doctor_patient_relationship_model import DoctorPatientRelationship

def init_db():
    app = create_app()
    with app.app_context():
        # Create all tables
        db.create_all()

        # Add a sample doctor
        sample_doctor = Doctor(username='sample_doctor', password='password', first_name='John', last_name='Doe',
                               email='mariusbotezatu343@gmail.com', phone_number='1234567890', specialization='Cardiology',
                               license_number=123456)
        db.session.add(sample_doctor)
        db.session.commit()

        # Add a sample patient
        sample_patient = Patient(username='sample_patient', password='password', first_name='Alice', last_name='Smith',
                                 email='ihnatdelric@gmail.com', phone_number='9876543210', date_of_birth=date(1993, 3, 1),
                                 gender='Female', address='123 Main St')
        db.session.add(sample_patient)
        db.session.commit()
        

        # Add a relationship between the doctor and the patient
        doctor_patient_relationship = DoctorPatientRelationship(doctor_id=sample_doctor.id,
                                                               patient_id=sample_patient.id)
        db.session.add(doctor_patient_relationship)

        # Commit the changes
        db.session.commit()
        print(f"doc id: {sample_doctor.id}")
        print(f"patient id: {sample_patient.id}")
        print(f"rel id: {doctor_patient_relationship.id}")

        print("Database initialized successfully.")

if __name__ == '__main__':
    init_db()
