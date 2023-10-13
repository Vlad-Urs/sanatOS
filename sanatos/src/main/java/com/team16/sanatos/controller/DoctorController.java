package com.team16.sanatos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
}