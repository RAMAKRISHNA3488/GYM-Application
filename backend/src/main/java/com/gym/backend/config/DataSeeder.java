package com.gym.backend.config;

import com.gym.backend.entity.Exercise;
import com.gym.backend.entity.WorkoutRoutine;
import com.gym.backend.repository.WorkoutRoutineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final WorkoutRoutineRepository workoutRoutineRepository;

    @Bean
    public CommandLineRunner seedWorkouts() {
        return args -> {
            if (workoutRoutineRepository.count() == 0) {
                // Routine 1: Full Body Beginner
                WorkoutRoutine fullBody = WorkoutRoutine.builder()
                        .name("Full Body Beginner")
                        .description("A complete body workout for beginners.")
                        .difficultyLevel("Beginner")
                        .goalType("GENERAL")
                        .exercises(Arrays.asList(
                                Exercise.builder().name("Push Ups").sets(3).reps(10).targetMuscleGroup("Chest").build(),
                                Exercise.builder().name("Bodyweight Squats").sets(3).reps(15).targetMuscleGroup("Legs")
                                        .build(),
                                Exercise.builder().name("Plank").sets(3).durationSeconds(30).targetMuscleGroup("Core")
                                        .build()))
                        .build();

                // Routine 2: Upper Body Strength
                WorkoutRoutine upperBody = WorkoutRoutine.builder()
                        .name("Upper Body Strength")
                        .description("Focus on chest, back, and arms.")
                        .difficultyLevel("Intermediate")
                        .goalType("MUSCLE_GAIN")
                        .exercises(Arrays.asList(
                                Exercise.builder().name("Bench Press").sets(4).reps(8).targetMuscleGroup("Chest")
                                        .build(),
                                Exercise.builder().name("Pull Ups").sets(3).reps(10).targetMuscleGroup("Back").build(),
                                Exercise.builder().name("Overhead Press").sets(3).reps(12)
                                        .targetMuscleGroup("Shoulders").build(),
                                Exercise.builder().name("Bicep Curls").sets(3).reps(12).targetMuscleGroup("Arms")
                                        .build()))
                        .build();

                // Routine 3: Cardio Burn
                WorkoutRoutine cardio = WorkoutRoutine.builder()
                        .name("HIIT Cardio Burn")
                        .description("High intensity interval training for fat loss.")
                        .difficultyLevel("Advanced")
                        .goalType("WEIGHT_LOSS")
                        .exercises(Arrays.asList(
                                Exercise.builder().name("Burpees").sets(4).reps(15).targetMuscleGroup("Full Body")
                                        .build(),
                                Exercise.builder().name("Mountain Climbers").sets(4).durationSeconds(45)
                                        .targetMuscleGroup("Core").build(),
                                Exercise.builder().name("Jump Rope").sets(5).durationSeconds(60)
                                        .targetMuscleGroup("Full Body").build()))
                        .build();

                workoutRoutineRepository.saveAll(List.of(fullBody, upperBody, cardio));
                System.out.println("Default workout routines seeded.");
            }
        };
    }
}
