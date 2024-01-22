from flask import jsonify, request, redirect
from __main__ import app
from models.doctor_model import Doctor
from models.patient_model import Patient
from app import db
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import random

secret_code = 0
user_email = ''
user_type = ''

@app.route('/login',methods=['POST'])
def login_page():

    data = request.get_json()

    try:
        email = data.get('email')
        password = data.get('password')

        # Check if the user is a doctor
        doctor = Doctor.query.filter_by(email=email).first()
        if doctor and doctor.check_password(password):
            # Doctor login successful
            user_email = email
            user_type = 'doc'
            send_email(email)
            return redirect("/email-verification")
        
        # Check if the user is a patient
        patient = Patient.query.filter_by(email=email).first()
        if patient and patient.check_password(password):
            # Patient login successful
            user_email = email
            user_type = 'pat'
            send_email(email)
            return redirect("/email-verification")
        
        # If no user found or passwords don't match
        return jsonify({"error": "Email or password incorrect"}), 404



    except KeyError:
        return jsonify({"error": "Password or email incorrect"}), 404
    
def send_email(to_email):
    # Set up the email server and login
    smtp_server = "smtp.zoho.eu"
    smtp_port = 587
    smtp_username = "testo.testovic@zohomail.eu"
    smtp_password = "p4PJeDznNwS0"

    # Set up the email message
    message = MIMEMultipart()
    message["From"] = smtp_username
    message["To"] = to_email
    
    secret_code = random.randint(100000, 999999)
    message["Subject"] = "Authentication Code"
    body = str(secret_code)
    message.attach(MIMEText(body, "plain"))

    # Connect to the server and send the email
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(smtp_username, to_email, message.as_string())
        print("Email sent successfully!")
    except Exception as e:
        print("Error sending email:", e)
    finally:
        server.quit()
    


@app.route("/email-verification", methods=['POST'])
def verify_code():
    
    data = request.get_json()

    try:

        if data.get('code') == secret_code:
            if user_type == 'doc':
                doctor = Doctor.query.filter_by(email=user_email).first()

                if doctor:
                    return redirect(f"/doctor-{doctor.id}")
                else:
                    return redirect('/login')
            
            elif user_type == 'pat':
                patient = Patient.query.filter_by(email=user_email).first()

                if patient:
                    return redirect(f"/doctor-{patient.id}")
                else:
                    return redirect('/login')
        
        return redirect('/login')

    except KeyError:
        return redirect('/login')