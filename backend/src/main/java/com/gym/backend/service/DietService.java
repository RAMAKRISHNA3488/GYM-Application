package com.gym.backend.service;

import com.gym.backend.entity.DietPlan;
import com.gym.backend.entity.FitnessProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DietService {
    private final FitnessProfileService fitnessProfileService;

    // AI-based Diet Generation
    public DietPlan generateAiDiet() {
        FitnessProfile profile = fitnessProfileService.getMyProfile();

        int calorieGoal = (profile.getDailyCalorieGoal() != null) ? profile.getDailyCalorieGoal() : 2000;

        // Simple logic: Protein 30%, Fat 25%, Carbs 45%
        int protein = (int) ((calorieGoal * 0.30) / 4);
        int fat = (int) ((calorieGoal * 0.25) / 9);
        int carbs = (int) ((calorieGoal * 0.45) / 4);

        return DietPlan.builder()
                .name("AI Personalized Diet")
                .totalCalories(calorieGoal)
                .proteinGrams(protein)
                .fatGrams(fat)
                .carbsGrams(carbs)
                .build();
    }
}
