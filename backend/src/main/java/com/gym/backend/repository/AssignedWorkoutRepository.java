package com.gym.backend.repository;

import com.gym.backend.entity.AssignedWorkout;
import com.gym.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AssignedWorkoutRepository extends JpaRepository<AssignedWorkout, Long> {
    List<AssignedWorkout> findByUser(User user);

    List<AssignedWorkout> findByUser_Id(Long userId);

    List<AssignedWorkout> findByUser_IdOrderByScheduledDateDesc(Long userId);

    List<AssignedWorkout> findByUserAndScheduledDate(User user, LocalDate scheduledDate);

    List<AssignedWorkout> findByUser_IdAndScheduledDate(Long userId, LocalDate scheduledDate);

    List<AssignedWorkout> findByUserAndScheduledDateBetween(User user, LocalDate startDate, LocalDate endDate);
}
