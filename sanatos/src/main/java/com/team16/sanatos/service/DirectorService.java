package com.team16.sanatos.service;

import com.team16.sanatos.model.Doctor;
import com.team16.sanatos.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DirectorService {
    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor saveDetails(Doctor doctor) {
        return doctorRepository.save(doctor);
    }
}
