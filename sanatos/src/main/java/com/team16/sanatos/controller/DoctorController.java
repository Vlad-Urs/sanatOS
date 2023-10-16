package com.team16.sanatos.controller;

import java.util.List;

import com.team16.sanatos.model.Patient;
import com.team16.sanatos.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.team16.sanatos.model.Doctor;
import com.team16.sanatos.repository.DoctorRepository;

@RestController
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

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
}