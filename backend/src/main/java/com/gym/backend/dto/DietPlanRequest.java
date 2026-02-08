package com.gym.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietPlanRequest {
    private Long userId;
    private String planName;
    private String goal;
    private Integer targetCalories;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<MealDto> meals;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MealDto {
        private String mealType;
        private String foodItems;
        private Integer calories;
        private Integer protein;
        private Integer carbs;
        private Integer fats;
        private String instructions;
    }
}
