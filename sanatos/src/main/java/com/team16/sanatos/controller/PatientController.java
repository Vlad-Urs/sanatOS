package com.team16.sanatos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.team16.sanatos.model.Patient;
import com.team16.sanatos.repository.PatientRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    // get all patients
    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
}
