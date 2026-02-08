package com.gym.backend.controller;

import com.gym.backend.entity.FitnessProfile;
import com.gym.backend.service.FitnessProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/profile")
@RequiredArgsConstructor
public class FitnessProfileController {

    private final FitnessProfileService fitnessProfileService;

    @GetMapping
    public ResponseEntity<FitnessProfile> getMyProfile() {
        return ResponseEntity.ok(fitnessProfileService.getMyProfile());
    }

    @PutMapping
    public ResponseEntity<FitnessProfile> updateProfile(@RequestBody FitnessProfile profile) {
        return ResponseEntity.ok(fitnessProfileService.updateProfile(profile));
    }
}
