package com.team16.sanatos.repository;

import com.team16.sanatos.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacientRepository extends JpaRepository<Patient, Integer> {
}
