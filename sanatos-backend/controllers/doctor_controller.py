from datetime import datetime
from flask import jsonify, request
from __main__ import app
from models.doctor_model import Doctor
from models.patient_model import Patient
from models.medical_history_model import MedicalHistory
from models.doctor_patient_relationship_model import DoctorPatientRelationship
from app import db

@app.route('/doctor-<int:doctor_id>', methods=['GET'])
def get_doctor_by_id(doctor_id):
    # Find the Doctor by ID
    doctor = Doctor.query.get(doctor_id)

    if doctor is not None:
        return jsonify({
            "doctor_id": doctor.id,
            "username": doctor.username,
            "first_name": doctor.first_name,
            "last_name": doctor.last_name,
            "email": doctor.email,
            "phone_number": doctor.phone_number,
            "specialization": doctor.specialization,
            "license_number": doctor.license_number
        }), 200
    else:
        return jsonify({"error": "Doctor not found"}), 404
    

@app.route('/doctor-<int:doctor_id>/patients', methods=['GET'])
def get_patients_by_doctor(doctor_id):     

    try: 
        # Find the doctor by ID
        doctor = Doctor.query.get(doctor_id)
        # Get all patients related to the doctor
        patients = (
        Patient.query
        .join(DoctorPatientRelationship, DoctorPatientRelationship.patient_id == Patient.id)
        .filter(DoctorPatientRelationship.doctor_id == doctor_id)
        .all()
    )
        
        print(patients)

        # Return the list of patients
        patients_data = [{"patient_id": patient.id, "username": patient.username, "first_name": patient.first_name, "last_name": patient.last_name, "email": patient.email,
            "phone_number": patient.phone_number,
            "date_of_birth": patient.date_of_birth,
            "gender": patient.gender,
            "adress": patient.address}
                        for patient in patients]

        return jsonify({"patients": patients_data}), 200
    
    except KeyError:
        return jsonify({"error": "Doctor not found"}), 404



@app.route('/doctor-<int:doctor_id>/patients/add', methods=['POST'])
def add_patient_to_doctor(doctor_id):
    # Find the doctor by ID
    doctor = Doctor.query.get(doctor_id)

    if not doctor:
        return jsonify({"error": "Doctor not found"}), 404

    # Parse the JSON data from the request
    data = request.get_json()

    # Create a new patient
    new_patient = Patient(
        username=data.get('username'),
        password=data.get('password'),
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        email=data.get('email'),
        phone_number=data.get('phone_number'),
        date_of_birth=datetime.strptime(data.get('date_of_birth'), '%Y-%m-%d'),
        gender=data.get('gender'),
        address=data.get('address')
    )

    # Add the patient to the database
    db.session.add(new_patient)
    db.session.commit()

    new_relationship = DoctorPatientRelationship(patient_id=new_patient.id, doctor_id = doctor_id)

    db.session.add(new_relationship)
    db.session.commit()

    return jsonify({"message": "Patient added successfully"}), 201


@app.route('/doctor-<int:doctor_id>/patients/patient-<int:patient_id>/history', methods=['POST'])
def add_medical_history_to_patient(doctor_id, patient_id):
    # Find the doctor by ID
    doctor = Doctor.query.get(doctor_id)

    if not doctor:
        return jsonify({"error": "Doctor not found"}), 404
    

    patients = (
        Patient.query
        .join(DoctorPatientRelationship, DoctorPatientRelationship.patient_id == Patient.id)
        .filter(DoctorPatientRelationship.doctor_id == doctor_id)
        .all()
    )

    # Check if the patient is associated with the doctor
    if not any(patient.id == patient_id for patient in patients):
        return jsonify({"error": "Patient not associated with this doctor"}), 403

    # Find the patient by ID
    patient = Patient.query.get(patient_id)

    if not patient:
        return jsonify({"error": "Patient not found"}), 404

    # Parse the JSON data from the request
    data = request.get_json()

    # Create a new medical history entry for the patient
    new_history_entry = MedicalHistory(
        patient_id=patient_id,
        doctor_id=doctor_id,
        history_text=data.get('history_text'),
        entry_date=datetime.strptime(data.get('entry_date'), '%Y-%m-%d')
    )

    # Add the history entry to the database
    db.session.add(new_history_entry)
    db.session.commit()

    return jsonify({"message": "Medical history entry added successfully"}), 201