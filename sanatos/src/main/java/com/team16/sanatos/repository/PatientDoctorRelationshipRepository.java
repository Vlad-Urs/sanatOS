package com.team16.sanatos.repository;


import com.team16.sanatos.model.PatientDoctorRelationship;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientDoctorRelationshipRepository extends JpaRepository<PatientDoctorRelationship, Integer> {
}
