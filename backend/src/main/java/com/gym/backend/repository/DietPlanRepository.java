package com.gym.backend.repository;

import com.gym.backend.entity.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DietPlanRepository extends JpaRepository<DietPlan, Long> {
    List<DietPlan> findByUser_Id(Long userId);

    Optional<DietPlan> findByUser_IdAndIsActiveTrue(Long userId);
}
