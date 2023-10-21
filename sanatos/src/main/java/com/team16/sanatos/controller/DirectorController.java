package com.team16.sanatos.controller;

import com.team16.sanatos.model.*;
import com.team16.sanatos.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class DirectorController {

    @Autowired
    private DirectorService directorService;

    @PostMapping("/doctors")
    public Doctor postDetails(@RequestBody Doctor doctor) {
        return directorService.saveDetails(doctor);
    }

}