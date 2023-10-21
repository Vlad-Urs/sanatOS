package com.team16.sanatos.controller;

import com.team16.sanatos.dto.DoctorDTO;
import com.team16.sanatos.model.Doctor;
import com.team16.sanatos.model.MedicalHistory;
import com.team16.sanatos.model.Patient;
import com.team16.sanatos.model.PatientDoctorRelationship;
import com.team16.sanatos.repository.DoctorRepository;
import com.team16.sanatos.repository.PatientDoctorRelationshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.team16.sanatos.repository.PatientRepository;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8000")
@RestController
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientDoctorRelationshipRepository relationshipRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/patient-{patientId}")
    public ResponseEntity<Patient> getPatientProfile(@PathVariable int patientId) {
        Patient patient = patientRepository.findById(patientId).orElse(null);

        if (patient == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

    @GetMapping("/patient-{patientId}/doctors")
    public ResponseEntity<List<DoctorDTO>> getPatientsDoctors(@PathVariable int patientId) {
        Patient patient = patientRepository.findById(patientId).orElse(null);

        if (patient == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<PatientDoctorRelationship> relationships = relationshipRepository.findAllByPatientId(patientId);

        List<Integer> doctorsIds = new ArrayList<Integer>();
        for (PatientDoctorRelationship rel : relationships) {
            doctorsIds.add(rel.getDoctorId());
        }

        List<Doctor> doctorsRaw = doctorRepository.findAllById(doctorsIds);

        ArrayList<DoctorDTO> doctors = new ArrayList<DoctorDTO>();

        for (Doctor doc : doctorsRaw) {
            DoctorDTO doctorDTO = new DoctorDTO();
            doctorDTO.setDoctorId(doc.getDoctorId());
            doctorDTO.setUsername(doc.getUsername());
            doctorDTO.setFirstName(doc.getFirstName());
            doctorDTO.setLastName(doc.getLastName());
            doctorDTO.setEmail(doc.getEmail());
            doctorDTO.setPhoneNumber(doc.getPhoneNumber());
            doctorDTO.setSpecialization(doc.getSpecialization());
            doctorDTO.setLicenseNumber(doc.getLicenseNumber());

            doctors.add(doctorDTO);
        }

        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }
}
