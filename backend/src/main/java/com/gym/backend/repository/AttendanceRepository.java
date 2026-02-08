package com.gym.backend.repository;

import com.gym.backend.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByUser_Id(Long userId);

    java.util.Optional<Attendance> findTopByUser_IdAndCheckOutTimeIsNullOrderByCheckInTimeDesc(Long userId);
}
