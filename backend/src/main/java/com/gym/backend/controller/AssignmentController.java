package com.gym.backend.controller;

import com.gym.backend.dto.AssignWorkoutRequest;
import com.gym.backend.dto.WeeklyAssignmentRequest;
import com.gym.backend.entity.AssignedWorkout;
import com.gym.backend.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @PostMapping("/admin/assign-daily")
    public ResponseEntity<AssignedWorkout> assignDailyWorkout(
            @RequestBody AssignWorkoutRequest request) {
        return ResponseEntity.ok(assignmentService.assignWorkout(request));
    }

    @PostMapping("/admin/assign-weekly")
    public ResponseEntity<List<AssignedWorkout>> assignWeeklyWorkouts(
            @RequestBody WeeklyAssignmentRequest request) {
        return ResponseEntity.ok(assignmentService.assignWeeklyWorkouts(request));
    }

    @GetMapping("/user/daily")
    public ResponseEntity<List<AssignedWorkout>> getUserDailyWorkouts(
            Authentication authentication,
            @RequestParam(required = false) LocalDate date) {
        if (date == null) {
            date = LocalDate.now();
        }
        return ResponseEntity.ok(assignmentService.getDailyWorkoutsForUser(authentication.getName(), date));
    }

    @GetMapping("/user/all")
    public ResponseEntity<List<AssignedWorkout>> getUserAllWorkouts(
            Authentication authentication) {
        return ResponseEntity.ok(assignmentService.getWorkoutsForUser(authentication.getName()));
    }

    @PutMapping("/user/{id}/complete")
    public ResponseEntity<AssignedWorkout> completeWorkout(
            @PathVariable Long id,
            @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(assignmentService.markComplete(id, notes));
    }

    // Admin viewing user progress
    @GetMapping("/admin/user/{userId}")
    public ResponseEntity<List<AssignedWorkout>> getAdminViewUserProgress(
            @PathVariable Long userId) {
        return ResponseEntity.ok(assignmentService.getAdminViewUserProgress(userId));
    }
}
