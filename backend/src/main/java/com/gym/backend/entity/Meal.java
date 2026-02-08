package com.gym.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "meals")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "diet_plan_id")
    @JsonIgnore
    private DietPlan dietPlan;

    private String mealType; // e.g., "Breakfast", "Lunch", "Dinner", "Snack"
    private String foodItems;
    private Integer calories;
    private Integer protein; // in grams
    private Integer carbs; // in grams
    private Integer fats; // in grams

    @Column(length = 500)
    private String instructions;
}
