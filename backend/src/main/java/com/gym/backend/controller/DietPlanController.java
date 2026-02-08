package com.gym.backend.controller;

import com.gym.backend.dto.DietPlanRequest;
import com.gym.backend.entity.DietPlan;
import com.gym.backend.service.DietPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diet-plans")
@RequiredArgsConstructor
public class DietPlanController {

    private final DietPlanService dietPlanService;

    @PostMapping("/admin/create")
    public ResponseEntity<DietPlan> createDietPlan(@RequestBody DietPlanRequest request) {
        try {
            DietPlan dietPlan = dietPlanService.createDietPlan(request);
            return ResponseEntity.ok(dietPlan);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/admin/user/{userId}")
    public ResponseEntity<List<DietPlan>> getUserDietPlans(@PathVariable Long userId) {
        return ResponseEntity.ok(dietPlanService.getUserDietPlans(userId));
    }

    @GetMapping("/admin/user/{userId}/active")
    public ResponseEntity<DietPlan> getActiveDietPlan(@PathVariable Long userId) {
        DietPlan plan = dietPlanService.getActiveDietPlan(userId);
        return plan != null ? ResponseEntity.ok(plan) : ResponseEntity.notFound().build();
    }

    @GetMapping("/my-plan")
    public ResponseEntity<DietPlan> getMyActivePlan() {
        DietPlan plan = dietPlanService.getMyActiveDietPlan();
        return plan != null ? ResponseEntity.ok(plan) : ResponseEntity.notFound().build();
    }
}
