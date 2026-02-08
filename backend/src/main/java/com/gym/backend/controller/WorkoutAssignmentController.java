package com.gym.backend.controller;

import com.gym.backend.entity.AssignedWorkout;
import com.gym.backend.entity.ExerciseCompletion;
import com.gym.backend.service.WorkoutAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/workout-assignments")
@RequiredArgsConstructor
public class WorkoutAssignmentController {

    private final WorkoutAssignmentService workoutAssignmentService;

    // Admin endpoints
    @PostMapping("/admin/assign")
    public ResponseEntity<AssignedWorkout> assignWorkout(@RequestBody Map<String, Object> request) {
        try {
            Long userId = Long.valueOf(request.get("userId").toString());
            Long routineId = Long.valueOf(request.get("routineId").toString());
            LocalDate scheduledDate = LocalDate.parse(request.get("scheduledDate").toString());
            String adminNotes = request.get("adminNotes") != null ? request.get("adminNotes").toString() : "";

            AssignedWorkout assignment = workoutAssignmentService.assignWorkout(userId, routineId, scheduledDate,
                    adminNotes);
            return ResponseEntity.ok(assignment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/admin/user/{userId}")
    public ResponseEntity<List<AssignedWorkout>> getUserWorkouts(@PathVariable Long userId) {
        return ResponseEntity.ok(workoutAssignmentService.getUserWorkouts(userId));
    }

    // User endpoints
    @GetMapping("/my-workouts")
    public ResponseEntity<List<AssignedWorkout>> getMyWorkouts() {
        return ResponseEntity.ok(workoutAssignmentService.getMyWorkouts());
    }

    @GetMapping("/today")
    public ResponseEntity<List<AssignedWorkout>> getTodayWorkouts() {
        return ResponseEntity.ok(workoutAssignmentService.getTodayWorkouts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssignedWorkout> getWorkoutDetails(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(workoutAssignmentService.getWorkoutDetails(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/start")
    public ResponseEntity<AssignedWorkout> startWorkout(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(workoutAssignmentService.startWorkout(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/exercise/{id}/complete")
    public ResponseEntity<ExerciseCompletion> completeExercise(
            @PathVariable Long id,
            @RequestBody Map<String, Object> request) {
        try {
            Integer sets = request.get("sets") != null ? Integer.valueOf(request.get("sets").toString()) : 0;
            Integer reps = request.get("reps") != null ? Integer.valueOf(request.get("reps").toString()) : 0;
            String notes = request.get("notes") != null ? request.get("notes").toString() : "";

            return ResponseEntity.ok(workoutAssignmentService.completeExercise(id, sets, reps, notes));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<AssignedWorkout> completeWorkout(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> request) {
        try {
            String userNotes = request != null && request.get("userNotes") != null ? request.get("userNotes") : "";
            return ResponseEntity.ok(workoutAssignmentService.completeWorkout(id, userNotes));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
