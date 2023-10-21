package com.team16.sanatos.repository;

import com.team16.sanatos.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {
    Prescription findByPatientId(int patientId);
}
