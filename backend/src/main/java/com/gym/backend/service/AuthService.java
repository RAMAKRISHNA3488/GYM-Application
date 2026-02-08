package com.gym.backend.service;

import com.gym.backend.dto.AuthRequest;
import com.gym.backend.dto.AuthResponse;
import com.gym.backend.dto.RegisterRequest;
import com.gym.backend.entity.Role;
import com.gym.backend.entity.User;
import com.gym.backend.repository.UserRepository;
import com.gym.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthResponse register(RegisterRequest request) {
                var user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(Role.USER)
                                .build();
                userRepository.save(user);
                var jwtToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .role(user.getRole().name())
                                .name(user.getName())
                                .build();
        }

        public AuthResponse authenticate(AuthRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));
                var user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow();
                var jwtToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                                .token(jwtToken)
                                .role(user.getRole().name())
                                .name(user.getName())
                                .build();
        }
}
