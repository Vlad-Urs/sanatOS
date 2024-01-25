from datetime import datetime
from flask import jsonify, request, redirect
from __main__ import app
from models.doctor_model import Doctor
from models.patient_model import Patient
from models.doctor_patient_relationship_model import DoctorPatientRelationship
from models.medical_history_model import MedicalHistory
from models.prescriptions_model import Prescription
from app import db
import re

@app.route('/patient-<int:patient_id>', methods=['GET'])
def get_patient_by_id(patient_id):
    # Find the Patient by ID
    patient = Patient.query.get(patient_id)

    if patient is not None:
        return jsonify({
            "patient_id": patient.id,
            "username": patient.username,
            "first_name": patient.first_name,
            "last_name": patient.last_name,
            "email": patient.email,
            "phone_number": patient.phone_number,
            "date_of_birth": patient.date_of_birth,
            "gender": patient.gender,
            "adress": patient.address
        }), 200
    else:
        return jsonify({"error": "Patient not found"}), 404
    

@app.route('/patient-<int:patient_id>/doctors',methods=['GET'])
def get_doctors_by_patient(patient_id):

    try: 
        # Find the patient by ID
        patient = Patient.query.get(patient_id)
        # Get all doctors related to the patient
        doctors = (
        Doctor.query
        .join(DoctorPatientRelationship, DoctorPatientRelationship.patient_id == Doctor.id)
        .filter(DoctorPatientRelationship.patient_id == patient_id)
        .all()
    )
        
        # Return the list of doctors
        doctors_data = [
            {
            "doctor_id": doctor.id,
            "username": doctor.username,
            "first_name": doctor.first_name,
            "last_name": doctor.last_name,
            "email": doctor.email,
            "phone_number": doctor.phone_number,
            "specialization": doctor.specialization,
            "license_number": doctor.license_number
            }
            for doctor in doctors]

        return jsonify({"doctors": doctors_data}), 200
    
    except KeyError:
        return jsonify({"error": "Patient not found"}), 404
    

@app.route('/patient-<int:patient_id>/history',methods=['GET'])
def get_patient_history(patient_id):
    # Find the Patient by ID
    patient = Patient.query.get(patient_id)

    if patient is not None:
        # Retrieve the patient's medical history
        patient_history = MedicalHistory.query.filter_by(patient_id=patient_id).all()

        # Format the response
        history_data = [
            {
                "history_id": entry.id,
                "entry_date": entry.entry_date.strftime('%Y-%m-%d'),  # Format as needed
                "history_text": entry.history_text
            }
            for entry in patient_history
        ]

        return jsonify({"patient_history": history_data}), 200
    else:
        return jsonify({"error": "Patient not found"}), 404


@app.route('/patient-<int:patient_id>/prescriptions', methods=['GET'])
def get_prescriptions_for_patient(patient_id):
    # Find the Patient by ID
    patient = Patient.query.get(patient_id)

    if patient is not None:
        # Retrieve the patient's prescriptions
        patient_prescriptions = Prescription.query.filter_by(patient_id=patient_id).all()

        prescriptions_data = [
            {
                "prescription_id": prescription.id,
                "doctor_id": prescription.doctor_id,
                "medication": prescription.medication,
                "dosage": prescription.dosage,
                "duration": prescription.duration
            }
            for prescription in patient_prescriptions
        ]

        return jsonify({"patient_prescriptions": prescriptions_data}), 200
    else:
        return jsonify({"error": "Patient not found"}), 404


@app.route('/patient-<int:patient_id>/register', methods=['POST'])
def register_patient(patient_id):
    # Find the Patient by ID
    patient = Patient.query.get(patient_id)

    if patient is not None:
        # Parse the JSON data from the request
        # should a be an username and a password
        data = request.get_json()

        existing_patient = Patient.query.filter_by(username=data.get('username')).first()
        if existing_patient:
            return jsonify({"error": "Username already taken"}), 400
        
        password = data.get('password')
        if len(password)<8:
            return jsonify({"error":"Password not long enough"}), 400
        
        if not any(char.isupper() for char in password):
            return jsonify({"error":"Password must contain capitalized letters"}), 400
        
        if not any(char.isdigit() for char in password):
            return jsonify({"error":"Password must contain numbers"}), 400
        
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            return jsonify({"error":"""Password must contain at least one symbol ([!@#$%^&*(),.?":{}|<>])"""}), 400
        
        if ' ' in password:
            return jsonify({"error":"Password must not contain spaces"}), 400
        
        # Update the patient's username and password
        patient.username = data.get('username')
        patient.password = data.get('password')  # Note: You should hash and salt the password in a real-world scenario

        # Commit the changes to the database
        db.session.commit()

        return redirect(f"/patient-{patient.id}")
        
    else:
        return jsonify({"error": "Patient not found"}), 404