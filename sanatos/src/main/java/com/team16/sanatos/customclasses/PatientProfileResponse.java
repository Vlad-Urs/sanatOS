package com.team16.sanatos.customclasses;

import com.team16.sanatos.model.MedicalHistory;
import com.team16.sanatos.model.Patient;
import com.team16.sanatos.model.Prescription;

import java.util.List;

public class PatientProfileResponse {
    private Patient patient;
    private MedicalHistory medHistory;
    private List<Prescription> prescriptions;

    public PatientProfileResponse() {
        // Default constructor
    }

    public PatientProfileResponse(Patient patient, MedicalHistory medHistory, List<Prescription> prescriptions) {
        this.patient = patient;
        this.medHistory = medHistory;
        this.prescriptions = prescriptions;
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

    public List<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }
}
