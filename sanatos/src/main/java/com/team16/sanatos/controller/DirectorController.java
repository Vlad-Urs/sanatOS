package com.team16.sanatos.controller;

import com.team16.sanatos.dto.DoctorDTO;
import com.team16.sanatos.model.*;
import com.team16.sanatos.repository.DirectorRepository;
import com.team16.sanatos.repository.DoctorRepository;
import com.team16.sanatos.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class DirectorController {

    @Autowired
    private DirectorService directorService;

    @Autowired
    private DirectorRepository directorRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/director-{directorId}")
    public ResponseEntity<Director> getDoctorById(@PathVariable int directorId) {
        Director director = directorRepository.findById(directorId).orElse(null);

        if (director == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(director, HttpStatus.OK);
    }

    @GetMapping("/director-{directorId}/doctors")
    public ResponseEntity<List<DoctorDTO>> getPatientsForDoctor(@PathVariable int directorId) {
        Director director = directorRepository.findById(directorId).orElse(null);

        if (director == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Doctor> doctorsRaw = doctorRepository.findAll();

        ArrayList<DoctorDTO> doctors = new ArrayList<DoctorDTO>();

        for (Doctor doc : doctorsRaw){
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

    @PostMapping("/director-{directorId}/doctors/add")
    public Doctor postDetails(@RequestBody Doctor doctor) throws Exception {
        return directorService.saveDetails(doctor);
    }

}