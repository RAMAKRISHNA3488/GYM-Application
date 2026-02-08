package com.gym.backend.repository;

import com.gym.backend.entity.FitnessProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FitnessProfileRepository extends JpaRepository<FitnessProfile, Long> {
    Optional<FitnessProfile> findByUser_Id(Long userId);
}
