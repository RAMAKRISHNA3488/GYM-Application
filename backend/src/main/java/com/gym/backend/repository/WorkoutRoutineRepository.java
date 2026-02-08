package com.gym.backend.repository;

import com.gym.backend.entity.WorkoutRoutine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WorkoutRoutineRepository extends JpaRepository<WorkoutRoutine, Long> {
    List<WorkoutRoutine> findByUserId(Long userId);

    List<WorkoutRoutine> findByGoalType(String goalType);
}
