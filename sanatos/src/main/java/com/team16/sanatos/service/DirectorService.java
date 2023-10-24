package com.team16.sanatos.service;

import com.team16.sanatos.Security.KeyGenerator;
import com.team16.sanatos.Security.PasswordHasher;
import com.team16.sanatos.model.Doctor;
import com.team16.sanatos.model.User;
import com.team16.sanatos.repository.DoctorRepository;
import com.team16.sanatos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.KeyPair;

@Service
public class DirectorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    public Doctor saveDetails(Doctor doctor) throws Exception {

        /*
        KeyPair keyPair = KeyGenerator.generateKeyPair();

        // Hash and encrypt the password
        String encryptedPassword = PasswordHasher.hashAndEncryptPassword(doctor.getPassword(), keyPair.getPublic());

        // Update the patient's password with the encrypted password
        doctor.setPassword(encryptedPassword);*/



        // add new doctor to the user table
        User user = new User();
        user.setPassword(doctor.getPassword());
        user.setUsername(doctor.getUsername());
        user.setUserRole("DOCTOR");
        userRepository.save(user);

        return doctorRepository.save(doctor);
    }
}
