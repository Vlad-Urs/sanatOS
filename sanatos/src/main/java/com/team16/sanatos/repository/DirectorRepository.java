package com.team16.sanatos.repository;

import com.team16.sanatos.model.Director;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DirectorRepository extends JpaRepository<Director, Integer> {
    List<Director> findByUsername(String username);
}

