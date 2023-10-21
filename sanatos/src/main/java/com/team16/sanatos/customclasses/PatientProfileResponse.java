package com.team16.sanatos.customclasses;

import com.team16.sanatos.model.MedicalHistory;
import com.team16.sanatos.model.Patient;
import com.team16.sanatos.model.Prescription;

public class PatientProfileResponse {
    private Patient patient;
    private MedicalHistory medHistory;
    private Prescription prescription;

    public PatientProfileResponse() {
        // Default constructor
    }

    public PatientProfileResponse(Patient patient, MedicalHistory medHistory, Prescription prescription) {
        this.patient = patient;
        this.medHistory = medHistory;
        this.prescription = prescription;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public MedicalHistory getMedHistory() {
        return medHistory;
    }

    public void setMedHistory(MedicalHistory medHistory) {
        this.medHistory = medHistory;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }

    public Prescription getPrescription() {
        return prescription;
    }
}