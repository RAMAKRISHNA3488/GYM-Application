package com.gym.backend.controller;

import com.gym.backend.entity.Attendance;
import com.gym.backend.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/check-in")
    public ResponseEntity<?> checkIn() {
        try {
            return ResponseEntity.ok(attendanceService.checkIn());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/check-out")
    public ResponseEntity<?> checkOut() {
        try {
            return ResponseEntity.ok(attendanceService.checkOut());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Attendance> getStatus() {
        return ResponseEntity.ok(attendanceService.getStatus());
    }

    @GetMapping("/history")
    public ResponseEntity<List<Attendance>> getHistory() {
        return ResponseEntity.ok(attendanceService.getHistory());
    }
}
