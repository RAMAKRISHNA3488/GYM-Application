package com.gym.backend.repository;

import com.gym.backend.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Long> {
}
