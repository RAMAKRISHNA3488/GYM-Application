package com.gym.backend.repository;

import com.gym.backend.entity.ExerciseCompletion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseCompletionRepository extends JpaRepository<ExerciseCompletion, Long> {
    List<ExerciseCompletion> findByAssignedWorkout_Id(Long assignedWorkoutId);
}
