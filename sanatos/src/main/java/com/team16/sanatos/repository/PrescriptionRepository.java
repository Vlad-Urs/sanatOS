package com.team16.sanatos.repository;

import com.team16.sanatos.model.Prescription;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {
    List<Prescription> findByPatientId(int patientId);
}
