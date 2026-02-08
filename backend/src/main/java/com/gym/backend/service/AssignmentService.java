package com.gym.backend.service;

import com.gym.backend.repository.AssignedWorkoutRepository;
import com.gym.backend.repository.UserRepository;
import com.gym.backend.repository.WorkoutRoutineRepository;
import com.gym.backend.entity.AssignedWorkout;
import com.gym.backend.entity.WorkoutRoutine;
import com.gym.backend.entity.User;
import com.gym.backend.dto.AssignWorkoutRequest;
import com.gym.backend.dto.WeeklyAssignmentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignedWorkoutRepository assignedWorkoutRepository;
    private final UserRepository userRepository;
    private final WorkoutRoutineRepository workoutRoutineRepository;

    public AssignedWorkout assignWorkout(AssignWorkoutRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        WorkoutRoutine routine = workoutRoutineRepository.findById(request.getRoutineId())
                .orElseThrow(() -> new RuntimeException("Routine not found"));

        AssignedWorkout workout = AssignedWorkout.builder()
                .user(user)
                .workoutRoutine(routine)
                .scheduledDate(request.getDate())
                .adminNotes(request.getAdminNotes())
                .isCompleted(false)
                .build();

        return assignedWorkoutRepository.save(workout);
    }

    public List<AssignedWorkout> assignWeeklyWorkouts(WeeklyAssignmentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        WorkoutRoutine routine = workoutRoutineRepository.findById(request.getRoutineId())
                .orElseThrow(() -> new RuntimeException("Routine not found"));

        List<AssignedWorkout> assignments = new ArrayList<>();
        for (LocalDate date : request.getDates()) {
            AssignedWorkout workout = AssignedWorkout.builder()
                    .user(user)
                    .workoutRoutine(routine)
                    .scheduledDate(date)
                    .adminNotes(request.getAdminNotes())
                    .isCompleted(false)
                    .build();
            assignments.add(workout);
        }
        return assignedWorkoutRepository.saveAll(assignments);
    }

    public List<AssignedWorkout> getWorkoutsForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return assignedWorkoutRepository.findByUser(user);
    }

    public List<AssignedWorkout> getDailyWorkoutsForUser(String email, LocalDate date) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return assignedWorkoutRepository.findByUserAndScheduledDate(user, date);
    }

    public List<AssignedWorkout> getAdminViewUserProgress(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return assignedWorkoutRepository.findByUser(user); // Can filter by date range if needed
    }

    public AssignedWorkout markComplete(Long assignmentId, String userNotes) {
        AssignedWorkout workout = assignedWorkoutRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        // In real app, check if current user owns this assignment

        workout.setCompleted(true);
        workout.setUserNotes(userNotes);
        return assignedWorkoutRepository.save(workout);
    }
}
