package com.gym.backend.controller;

import com.gym.backend.entity.Program;
import com.gym.backend.service.ProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService programService;

    @GetMapping
    public ResponseEntity<List<Program>> getAllPrograms() {
        return ResponseEntity.ok(programService.getAllPrograms());
    }

    @PostMapping("/admin")
    public ResponseEntity<Program> createProgram(@RequestBody Program program) {
        return ResponseEntity.ok(programService.createProgram(program));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
        return ResponseEntity.ok().build();
    }
}
