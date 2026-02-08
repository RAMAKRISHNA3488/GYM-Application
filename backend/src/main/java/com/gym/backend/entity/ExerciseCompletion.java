package com.gym.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "exercise_completions")
public class ExerciseCompletion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assigned_workout_id", nullable = false)
    private AssignedWorkout assignedWorkout;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    @Builder.Default
    private boolean isCompleted = false;

    private LocalDateTime completedAt;

    private Integer setsCompleted;
    private Integer repsCompleted;
    private String notes; // User notes about this exercise
}
