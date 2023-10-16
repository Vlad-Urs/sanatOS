package com.team16.sanatos.service;

import com.team16.sanatos.model.Doctor;
import com.team16.sanatos.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class DoctorService {
    @Autowired
    private static DoctorRepository doctorRepository;

    public static Doctor getDoctorById(int doctorId) {
        return doctorRepository.findById(doctorId).orElse(null);
    }
}
