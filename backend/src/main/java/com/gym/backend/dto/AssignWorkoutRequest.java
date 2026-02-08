package com.gym.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignWorkoutRequest {
    private Long userId;
    private Long routineId;
    private LocalDate date;
    private String adminNotes;
}
