package com.gym.backend.service;

import com.gym.backend.entity.Plan;
import com.gym.backend.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {
    private final PlanRepository planRepository;

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }
}
