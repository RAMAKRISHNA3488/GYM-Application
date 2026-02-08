package com.gym.backend.service;

import com.gym.backend.entity.Attendance;
import com.gym.backend.entity.User;
import com.gym.backend.entity.FitnessProfile;
import com.gym.backend.repository.AttendanceRepository;
import com.gym.backend.repository.UserRepository;
import com.gym.backend.repository.FitnessProfileRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final FitnessProfileRepository fitnessProfileRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Attendance checkIn() {
        User user = getCurrentUser();
        // Check if already checked in
        Optional<Attendance> activeSession = attendanceRepository
                .findTopByUser_IdAndCheckOutTimeIsNullOrderByCheckInTimeDesc(user.getId());

        if (activeSession.isPresent()) {
            throw new RuntimeException("You are already checked in since " + activeSession.get().getCheckInTime());
        }

        Attendance attendance = Attendance.builder()
                .user(user)
                .checkInTime(LocalDateTime.now())
                .method("MANUAL")
                .build();

        return attendanceRepository.save(attendance);
    }

    public Attendance checkOut() {
        User user = getCurrentUser();
        Attendance activeSession = attendanceRepository
                .findTopByUser_IdAndCheckOutTimeIsNullOrderByCheckInTimeDesc(user.getId())
                .orElseThrow(() -> new RuntimeException("You are not checked in."));

        LocalDateTime now = LocalDateTime.now();
        activeSession.setCheckOutTime(now);

        long duration = Duration.between(activeSession.getCheckInTime(), now).toMinutes();
        activeSession.setSessionDurationMinutes((double) duration);

        // Update Fitness Profile Progress
        FitnessProfile profile = fitnessProfileRepository.findByUser_Id(user.getId())
                .orElseGet(() -> fitnessProfileRepository.save(FitnessProfile.builder()
                        .user(user)
                        .workoutsCompleted(0)
                        .caloriesBurnedTotal(0)
                        .lastUpdated(LocalDate.now())
                        .build()));

        profile.setWorkoutsCompleted((profile.getWorkoutsCompleted() == null ? 0 : profile.getWorkoutsCompleted()) + 1);

        // Estimate calories: ~5 calories per minute (moderate exercise)
        int caloriesBurned = (int) (duration * 5);
        profile.setCaloriesBurnedTotal(
                (profile.getCaloriesBurnedTotal() == null ? 0 : profile.getCaloriesBurnedTotal()) + caloriesBurned);

        profile.setLastUpdated(LocalDate.now());
        fitnessProfileRepository.save(profile);

        return attendanceRepository.save(activeSession);
    }

    public Attendance getStatus() {
        User user = getCurrentUser();
        return attendanceRepository
                .findTopByUser_IdAndCheckOutTimeIsNullOrderByCheckInTimeDesc(user.getId())
                .orElse(null);
    }

    public List<Attendance> getHistory() {
        User user = getCurrentUser();
        return attendanceRepository.findByUser_Id(user.getId());
    }
}
