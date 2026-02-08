package com.gym.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assigned_workouts")
public class AssignedWorkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({ "password", "subscriptions" })
    private User user;

    @ManyToOne
    @JoinColumn(name = "workout_routine_id", nullable = false)
    private WorkoutRoutine workoutRoutine;

    @Column(nullable = false)
    private LocalDate scheduledDate;

    @Builder.Default
    private boolean isCompleted = false;

    @Builder.Default
    private boolean isStarted = false;

    private LocalDateTime startedAt;
    private LocalDateTime completedAt;

    private String adminNotes; // Instructions from admin
    private String userNotes; // Feedback from user

    @OneToMany(mappedBy = "assignedWorkout", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExerciseCompletion> exerciseCompletions;
}
