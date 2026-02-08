package com.gym.backend.service;

import com.gym.backend.dto.DietPlanRequest;
import com.gym.backend.entity.DietPlan;
import com.gym.backend.entity.Meal;
import com.gym.backend.entity.User;
import com.gym.backend.repository.DietPlanRepository;
import com.gym.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DietPlanService {

    private final DietPlanRepository dietPlanRepository;
    private final UserRepository userRepository;

    @Transactional
    public DietPlan createDietPlan(DietPlanRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Deactivate existing active plans
        dietPlanRepository.findByUser_IdAndIsActiveTrue(user.getId())
                .ifPresent(existingPlan -> {
                    existingPlan.setIsActive(false);
                    dietPlanRepository.save(existingPlan);
                });

        String adminEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        DietPlan dietPlan = DietPlan.builder()
                .user(user)
                .planName(request.getPlanName())
                .goal(request.getGoal())
                .targetCalories(request.getTargetCalories())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .isActive(true)
                .createdBy(adminEmail)
                .build();

        DietPlan savedPlan = dietPlanRepository.save(dietPlan);

        // Create meals
        if (request.getMeals() != null && !request.getMeals().isEmpty()) {
            final DietPlan finalPlan = savedPlan;
            List<Meal> meals = request.getMeals().stream()
                    .map(mealDto -> Meal.builder()
                            .dietPlan(finalPlan)
                            .mealType(mealDto.getMealType())
                            .foodItems(mealDto.getFoodItems())
                            .calories(mealDto.getCalories())
                            .protein(mealDto.getProtein())
                            .carbs(mealDto.getCarbs())
                            .fats(mealDto.getFats())
                            .instructions(mealDto.getInstructions())
                            .build())
                    .collect(Collectors.toList());

            savedPlan.setMeals(meals);
            return dietPlanRepository.save(savedPlan);
        }

        return savedPlan;
    }

    public List<DietPlan> getUserDietPlans(Long userId) {
        return dietPlanRepository.findByUser_Id(userId);
    }

    public DietPlan getActiveDietPlan(Long userId) {
        return dietPlanRepository.findByUser_IdAndIsActiveTrue(userId)
                .orElse(null);
    }

    public DietPlan getMyActiveDietPlan() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return dietPlanRepository.findByUser_IdAndIsActiveTrue(user.getId())
                .orElse(null);
    }
}
