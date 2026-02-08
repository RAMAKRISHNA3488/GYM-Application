package com.gym.backend.service;

import com.gym.backend.entity.Program;
import com.gym.backend.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgramService {
    private final ProgramRepository programRepository;

    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    public Program createProgram(Program program) {
        return programRepository.save(program);
    }

    public void deleteProgram(Long id) {
        programRepository.deleteById(id);
    }
}
