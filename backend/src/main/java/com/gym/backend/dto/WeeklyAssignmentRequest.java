package com.gym.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WeeklyAssignmentRequest {
    private Long userId;
    private Long routineId;
    private List<LocalDate> dates; // Or day of week logic?
    private String adminNotes;
}
