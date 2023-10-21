package com.team16.sanatos.repository;

import com.team16.sanatos.model.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Integer> {
    MedicalHistory findByPatientId(int patientId);
}
