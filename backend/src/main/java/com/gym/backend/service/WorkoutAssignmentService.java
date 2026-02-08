package com.gym.backend.service;

import com.gym.backend.entity.*;
import com.gym.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutAssignmentService {

    private final AssignedWorkoutRepository assignedWorkoutRepository;
    private final ExerciseCompletionRepository exerciseCompletionRepository;
    private final UserRepository userRepository;
    private final WorkoutRoutineRepository workoutRoutineRepository;
    private final FitnessProfileRepository fitnessProfileRepository;

    @Transactional
    public AssignedWorkout assignWorkout(Long userId, Long routineId, LocalDate scheduledDate, String adminNotes) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        WorkoutRoutine routine = workoutRoutineRepository.findById(routineId)
                .orElseThrow(() -> new RuntimeException("Workout routine not found"));

        AssignedWorkout assignment = AssignedWorkout.builder()
                .user(user)
                .workoutRoutine(routine)
                .scheduledDate(scheduledDate)
                .adminNotes(adminNotes)
                .isCompleted(false)
                .isStarted(false)
                .build();

        AssignedWorkout saved = assignedWorkoutRepository.save(assignment);

        // Create exercise completions for each exercise in the routine
        if (routine.getExercises() != null && !routine.getExercises().isEmpty()) {
            List<ExerciseCompletion> completions = routine.getExercises().stream()
                    .map(exercise -> ExerciseCompletion.builder()
                            .assignedWorkout(saved)
                            .exercise(exercise)
                            .isCompleted(false)
                            .build())
                    .collect(Collectors.toList());

            exerciseCompletionRepository.saveAll(completions);
            saved.setExerciseCompletions(completions);
        }

        return saved;
    }

    @Transactional
    public AssignedWorkout startWorkout(Long assignmentId) {
        AssignedWorkout assignment = assignedWorkoutRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        if (!assignment.isStarted()) {
            assignment.setStarted(true);
            assignment.setStartedAt(LocalDateTime.now());
            return assignedWorkoutRepository.save(assignment);
        }

        return assignment;
    }

    @Transactional
    public ExerciseCompletion completeExercise(Long exerciseCompletionId, Integer sets, Integer reps, String notes) {
        ExerciseCompletion completion = exerciseCompletionRepository.findById(exerciseCompletionId)
                .orElseThrow(() -> new RuntimeException("Exercise completion not found"));

        completion.setCompleted(true);
        completion.setCompletedAt(LocalDateTime.now());
        completion.setSetsCompleted(sets);
        completion.setRepsCompleted(reps);
        completion.setNotes(notes);

        return exerciseCompletionRepository.save(completion);
    }

    @Transactional
    public AssignedWorkout completeWorkout(Long assignmentId, String userNotes) {
        AssignedWorkout assignment = assignedWorkoutRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        assignment.setCompleted(true);
        assignment.setCompletedAt(LocalDateTime.now());
        assignment.setUserNotes(userNotes);

        AssignedWorkout saved = assignedWorkoutRepository.save(assignment);

        // Update fitness profile
        updateFitnessProfile(assignment.getUser());

        return saved;
    }

    private void updateFitnessProfile(User user) {
        FitnessProfile profile = fitnessProfileRepository.findByUser_Id(user.getId())
                .orElseGet(() -> {
                    FitnessProfile newProfile = FitnessProfile.builder()
                            .user(user)
                            .workoutsCompleted(0)
                            .caloriesBurnedTotal(0)
                            .lastUpdated(LocalDate.now())
                            .build();
                    return fitnessProfileRepository.save(newProfile);
                });

        // Increment workouts completed
        profile.setWorkoutsCompleted((profile.getWorkoutsCompleted() == null ? 0 : profile.getWorkoutsCompleted()) + 1);
        profile.setLastUpdated(LocalDate.now());

        fitnessProfileRepository.save(profile);
    }

    public List<AssignedWorkout> getUserWorkouts(Long userId) {
        return assignedWorkoutRepository.findByUser_IdOrderByScheduledDateDesc(userId);
    }

    public List<AssignedWorkout> getMyWorkouts() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return assignedWorkoutRepository.findByUser_IdOrderByScheduledDateDesc(user.getId());
    }

    public List<AssignedWorkout> getTodayWorkouts() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return assignedWorkoutRepository.findByUser_IdAndScheduledDate(user.getId(), LocalDate.now());
    }

    public AssignedWorkout getWorkoutDetails(Long assignmentId) {
        return assignedWorkoutRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));
    }
}
