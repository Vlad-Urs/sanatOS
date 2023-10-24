package com.team16.sanatos.controller;

import com.team16.sanatos.Security.*;
import com.team16.sanatos.model.*;
import com.team16.sanatos.repository.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DirectorRepository directorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/login")
    public String showLoginForm() {
        return "login"; // Show a login form in your view
    }

    @PostMapping("/login")
    public String login(@RequestBody Login login) {

        User user = userRepository.findByUsername(login.getUsername());

        if (user != null && user.getPassword().equals(login.getPassword())) {
            // Successful login
            if (user.getUserRole().equals("DIRECTOR")) {
                List<Director> directors = directorRepository.findByUsername(user.getUsername());
                Integer directorId = directors.get(0).getDirectorId();
                // Redirect to director's profile
                return "redirect:/director-" + Integer.toString(directorId);

            } else if (user.getUserRole().equals("PATIENT")) {
                List<Patient> patients = patientRepository.findByUsername(user.getUsername());
                Integer patientId = patients.get(0).getPatientId();
                // Redirect to patient's profile
                return "redirect:/patient-" + Integer.toString(patientId);

            } else if (user.getUserRole().equals("DOCTOR")) {
                List<Doctor> doctors = doctorRepository.findByUsername(user.getUsername());
                Integer doctorId = doctors.get(0).getDoctorId();
                // Redirect to doctor's profile
                return "redirect:/doctor-" + Integer.toString(doctorId);
            }
        }

        // Failed login
        return "redirect:/login?error";
    }
}