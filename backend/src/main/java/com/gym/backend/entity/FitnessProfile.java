package com.gym.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "fitness_profiles")
public class FitnessProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private Double currentWeight; // kg
    private Double targetWeight; // kg
    private Double height; // cm
    private Double bmi;

    private Integer dailyCalorieGoal;

    // Simple tracking for now
    private Integer workoutsCompleted;
    private Integer caloriesBurnedTotal;

    private Integer age;
    private String gender; // MALE, FEMALE, OTHER
    private String fitnessGoal; // MUSCLE_GAIN, WEIGHT_LOSS, GENERAL

    private LocalDate lastUpdated;
}
