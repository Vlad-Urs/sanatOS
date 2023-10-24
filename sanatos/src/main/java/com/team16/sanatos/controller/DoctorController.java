package com.team16.sanatos.controller;

import java.security.KeyPair;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.team16.sanatos.Security.KeyGenerator;
import com.team16.sanatos.Security.PasswordHasher;
import com.team16.sanatos.dto.DoctorDTO;
import com.team16.sanatos.model.*;
import com.team16.sanatos.repository.*;
import com.team16.sanatos.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientDoctorRelationshipRepository relationshipRepository;

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private DoctorService doctorService;

    // get all doctors
    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @GetMapping("/doctor-{doctorId}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable int doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);

        if (doctor == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        DoctorDTO doctorDTO = new DoctorDTO();
        doctorDTO.setDoctorId(doctor.getDoctorId());
        doctorDTO.setUsername(doctor.getUsername());
        doctorDTO.setFirstName(doctor.getFirstName());
        doctorDTO.setLastName(doctor.getLastName());
        doctorDTO.setEmail(doctor.getEmail());
        doctorDTO.setPhoneNumber(doctor.getPhoneNumber());
        doctorDTO.setSpecialization(doctor.getSpecialization());
        doctorDTO.setLicenseNumber(doctor.getLicenseNumber());

        return new ResponseEntity<>(doctorDTO, HttpStatus.OK);
    }

    @GetMapping("/doctor-{doctorId}/patients")
    public ResponseEntity<List<Patient>> getPatientsForDoctor(@PathVariable int doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);

        if (doctor == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Implement the logic to fetch patients related to the doctor
        List<PatientDoctorRelationship> relationships = relationshipRepository.findByDoctorId(doctorId);

        List<Integer> patientIds = new ArrayList<Integer>();
        for (PatientDoctorRelationship rel : relationships) {
            patientIds.add(rel.getPatientId());
        }

        List<Patient> patients = new ArrayList<Patient>();
        patients = patientRepository.findAllById(patientIds);

        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @PostMapping("/doctor-{doctorId}/patients/add")
    public ResponseEntity<String> addPatientToDoctor(@PathVariable int doctorId, @RequestBody Patient patient) throws Exception {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);

        if (doctor == null) {
            return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
        }

        // Generate a key pair
        KeyPair keyPair = KeyGenerator.generateKeyPair();

        // Hash and encrypt the password
        String encryptedPassword = PasswordHasher.hashAndEncryptPassword(patient.getPassword(), keyPair.getPublic());

        // Update the patient's password with the encrypted password
        patient.setPassword(encryptedPassword);


        // Save the patient to the database
        patientRepository.save(patient);

        // Create a relationship between the doctor and the patient
        PatientDoctorRelationship relationship = new PatientDoctorRelationship();
        relationship.setDoctorId(doctorId);
        relationship.setPatientId(patient.getPatientId());

        relationshipRepository.save(relationship);

        return new ResponseEntity<>("Patient added to doctor", HttpStatus.CREATED);
    }

    @PostMapping("/doctor-{doctorId}/patients/patient-{patientId}/add-history")
    public ResponseEntity<String> addPatientHistory(@PathVariable int doctorId, @PathVariable int patientId,
            @RequestBody MedicalHistory history) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        Patient patient = patientRepository.findById(patientId).orElse(null);

        if (doctor == null) {
            return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
        }

        if (patient == null) {
            return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
        }

        medicalHistoryRepository.save(history);

        return new ResponseEntity<>("History added to patient", HttpStatus.CREATED);

    }

    @PostMapping("/doctor-{doctorId}/patients/patient-{patientId}/add-prescription")
    public ResponseEntity<String> addPatientPrescription(@PathVariable int doctorId, @PathVariable int patientId,
            @RequestBody Prescription prescription) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        Patient patient = patientRepository.findById(patientId).orElse(null);

        if (doctor == null) {
            return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
        }

        if (patient == null) {
            return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
        }

        prescriptionRepository.save(prescription);

        return new ResponseEntity<>("Prescription added to patient", HttpStatus.CREATED);

    }

}