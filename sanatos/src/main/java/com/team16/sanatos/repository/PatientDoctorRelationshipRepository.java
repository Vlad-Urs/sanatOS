package com.team16.sanatos.repository;


import com.team16.sanatos.model.PatientDoctorRelationship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientDoctorRelationshipRepository extends JpaRepository<PatientDoctorRelationship, Integer> {
    List<PatientDoctorRelationship> findByDoctorId(int doctorId);
}
