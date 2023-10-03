package com.team16.sanatos.repository;

import com.team16.sanatos.model.Pacient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacientRepository extends JpaRepository<Pacient, Integer> {
}
