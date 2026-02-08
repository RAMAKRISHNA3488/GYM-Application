package com.gym.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "exercises")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g. "Bench Press"
    private String targetMuscleGroup; // "CHEST"
    private Integer sets;
    private Integer reps;
    private Integer durationSeconds; // for cardio
    private String videoUrl; // For form visualization
}
