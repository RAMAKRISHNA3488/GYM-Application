package com.gym.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "diet_plans")
public class DietPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String planName;
    private String goal; // e.g., "Weight Loss", "Muscle Gain", "Maintenance"
    private Integer targetCalories;

    @Column(length = 1000)
    private String description;

    private LocalDate startDate;
    private LocalDate endDate;

    @OneToMany(mappedBy = "dietPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Meal> meals;

    private Boolean isActive;

    @Column(name = "created_by")
    private String createdBy; // Admin who created this plan
}
