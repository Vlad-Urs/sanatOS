package com.team16.sanatos.service;

import com.team16.sanatos.model.Doctor;
import com.team16.sanatos.model.Patient;
import com.team16.sanatos.model.PatientDoctorRelationship;
import com.team16.sanatos.repository.DoctorRepository;
import com.team16.sanatos.repository.PatientRepository;
import com.team16.sanatos.repository.PatientDoctorRelationshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService {
    @Autowired
    private static DoctorRepository doctorRepository;

    @Autowired
    private static PatientRepository patientRepository;

    @Autowired
    private static PatientDoctorRelationshipRepository relationshipRepository;

    public static Doctor getDoctorById(int doctorId) {
        return doctorRepository.findById(doctorId).orElse(null);
    }

    // Add a method to get patients by doctorId
    public static List<Patient> getPatientsByDoctorId(int doctorId) {
        // Query the patient_doctor_relationship table to get patientIds associated with the doctor
        List<PatientDoctorRelationship> relationships = relationshipRepository.findByDoctorId(doctorId);

        // Extract patientIds from the relationships
        List<Integer> patientIds = relationships.stream()
                .map(PatientDoctorRelationship::getPatientId)
                .collect(Collectors.toList());

        // Fetch the corresponding patients
        return patientRepository.findAllById(patientIds);
    }
}
