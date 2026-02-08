package com.gym.backend.service;

import com.gym.backend.entity.FitnessProfile;
import com.gym.backend.entity.User;
import com.gym.backend.repository.FitnessProfileRepository;
import com.gym.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class FitnessProfileService {

    private final FitnessProfileRepository fitnessProfileRepository;
    private final UserRepository userRepository;

    public FitnessProfile getMyProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();
        return fitnessProfileRepository.findByUser_Id(user.getId())
                .orElseGet(() -> createInitialProfile(user));
    }

    public FitnessProfile updateProfile(FitnessProfile updatedProfile) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        FitnessProfile profile = fitnessProfileRepository.findByUser_Id(user.getId())
                .orElseGet(() -> createInitialProfile(user));

        if (updatedProfile.getCurrentWeight() != null)
            profile.setCurrentWeight(updatedProfile.getCurrentWeight());
        if (updatedProfile.getTargetWeight() != null)
            profile.setTargetWeight(updatedProfile.getTargetWeight());
        if (updatedProfile.getHeight() != null)
            profile.setHeight(updatedProfile.getHeight());
        if (updatedProfile.getAge() != null)
            profile.setAge(updatedProfile.getAge());
        if (updatedProfile.getGender() != null)
            profile.setGender(updatedProfile.getGender());
        if (updatedProfile.getFitnessGoal() != null)
            profile.setFitnessGoal(updatedProfile.getFitnessGoal());
        if (updatedProfile.getDailyCalorieGoal() != null)
            profile.setDailyCalorieGoal(updatedProfile.getDailyCalorieGoal());

        // Recalculate BMI if possible
        if (profile.getCurrentWeight() != null && profile.getHeight() != null) {
            double heightM = profile.getHeight() / 100.0;
            profile.setBmi(profile.getCurrentWeight() / (heightM * heightM));
        }

        profile.setLastUpdated(LocalDate.now());
        return fitnessProfileRepository.save(profile);
    }

    private FitnessProfile createInitialProfile(User user) {
        return fitnessProfileRepository.save(FitnessProfile.builder()
                .user(user)
                .workoutsCompleted(0)
                .caloriesBurnedTotal(0)
                .lastUpdated(LocalDate.now())
                .build());
    }
}
