package com.gym.backend.service;

import com.gym.backend.entity.WorkoutRoutine;
import com.gym.backend.entity.FitnessProfile;
import com.gym.backend.repository.WorkoutRoutineRepository;
import com.gym.backend.repository.FitnessProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutService {
    private final WorkoutRoutineRepository workoutRepository;
    private final FitnessProfileService fitnessProfileService;

    // AI-based Workout Generation Logic (Simplified Rule-Based)
    public WorkoutRoutine generateAiWorkout() {
        FitnessProfile profile = fitnessProfileService.getMyProfile();

        // Logic to determine workout based on BMI/Goals
        String goal = "GENERAL";
        if (profile.getBmi() != null) {
            if (profile.getBmi() > 25)
                goal = "WEIGHT_LOSS";
            else if (profile.getBmi() < 18.5)
                goal = "MUSCLE_GAIN";
        }

        // For now, return existing routines matching this goal or create a placeholder
        // In a real system, this would call an AI model or complex algorithm

        List<WorkoutRoutine> routines = workoutRepository.findByGoalType(goal);
        if (routines.isEmpty()) {
            return WorkoutRoutine.builder()
                    .name("AI Generated Plan for " + goal)
                    .description("Auto-generated based on your BMI of " + profile.getBmi())
                    .difficultyLevel("Beginner")
                    .goalType(goal)
                    .build();
        }
        return routines.get(0);
    }

    public List<WorkoutRoutine> getAllRoutines() {
        return workoutRepository.findAll();
    }

    public WorkoutRoutine createRoutine(WorkoutRoutine routine) {
        return workoutRepository.save(routine);
    }
}
