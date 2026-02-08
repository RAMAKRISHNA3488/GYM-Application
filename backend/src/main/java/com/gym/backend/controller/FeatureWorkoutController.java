package com.gym.backend.controller;

import com.gym.backend.entity.WorkoutRoutine;
import com.gym.backend.service.WorkoutService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/features/workout")
@RequiredArgsConstructor
public class FeatureWorkoutController {

    private final WorkoutService workoutService;

    @GetMapping("/generate-ai")
    public ResponseEntity<WorkoutRoutine> generateAiWorkout() {
        return ResponseEntity.ok(workoutService.generateAiWorkout());
    }

    @GetMapping("/all")
    public ResponseEntity<List<WorkoutRoutine>> getAllRoutines() {
        return ResponseEntity.ok(workoutService.getAllRoutines());
    }

    @org.springframework.web.bind.annotation.PostMapping("/create")
    public ResponseEntity<WorkoutRoutine> createRoutine(
            @org.springframework.web.bind.annotation.RequestBody WorkoutRoutine routine) {
        return ResponseEntity.ok(workoutService.createRoutine(routine));
    }
}
