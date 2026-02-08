package com.gym.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "workout_routines")
public class WorkoutRoutine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Null if it's a template or system generated

    private String name; // e.g., "Full Body Blast", "Monday Chest"
    private String description;
    private String difficultyLevel;

    // For AI generation
    private String goalType; // "MUSCLE_GAIN", "WEIGHT_LOSS", "ENDURANCE"

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exercise> exercises;
}
