package com.gym.backend.controller;

import com.gym.backend.entity.Plan;
import com.gym.backend.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;

    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans() {
        return ResponseEntity.ok(planService.getAllPlans());
    }

    @PostMapping("/admin")
    public ResponseEntity<Plan> createPlan(@RequestBody Plan plan) {
        return ResponseEntity.ok(planService.createPlan(plan));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
        return ResponseEntity.ok().build();
    }
}
