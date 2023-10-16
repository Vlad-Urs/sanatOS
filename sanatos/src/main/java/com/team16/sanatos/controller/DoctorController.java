package com.team16.sanatos.controller;

import java.util.List;

import com.team16.sanatos.model.Patient;
import com.team16.sanatos.model.PatientDoctorRelationship;
import com.team16.sanatos.repository.*;
import com.team16.sanatos.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.team16.sanatos.model.Doctor;
import com.team16.sanatos.repository.DoctorRepository;

@RestController
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientDoctorRelationshipRepository patientDoctorRelationshipRepository;


    // get all doctors
    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @GetMapping("/{doctorId}/patients")
    public ResponseEntity<List<Patient>> getPatientsForDoctor(@PathVariable int doctorId) {
        Doctor doctor = DoctorService.getDoctorById(doctorId);
        if (doctor == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Patient> patients = doctor.getPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @PostMapping("/{doctorId}/patients")
    public ResponseEntity<String> addPatientToDoctor(@PathVariable int doctorId, @RequestBody Patient patient) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);

        if (doctor == null) {
            return new ResponseEntity<>("Doctor not found", HttpStatus.NOT_FOUND);
        }

        // Save the patient to the database
        patientRepository.save(patient);

        // Create a relationship between the doctor and the patient
        PatientDoctorRelationship relationship = new PatientDoctorRelationship();
        relationship.setDoctorId(doctorId);
        relationship.setPatientId(patient.getPatientId());

        patientDoctorRelationshipRepository.save(relationship);

        return new ResponseEntity<>("Patient added to doctor", HttpStatus.CREATED);
    }
}