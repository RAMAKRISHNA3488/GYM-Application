package com.gym.backend.controller;

import com.gym.backend.entity.DietPlan;
import com.gym.backend.service.DietService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/features/diet")
@RequiredArgsConstructor
public class FeatureDietController {

    private final DietService dietService;

    @GetMapping("/generate-ai")
    public ResponseEntity<DietPlan> generateAiDiet() {
        return ResponseEntity.ok(dietService.generateAiDiet());
    }
}
