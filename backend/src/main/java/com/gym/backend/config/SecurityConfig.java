package com.gym.backend.config;

import com.gym.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(csrf -> csrf.disable())
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/api/auth/**").permitAll()
                                                .requestMatchers(org.springframework.http.HttpMethod.GET,
                                                                "/api/plans/**", "/api/programs/**")
                                                .permitAll()
                                                .requestMatchers("/api/attendance/**").authenticated()
                                                .requestMatchers("/api/plans/admin/**", "/api/programs/admin/**",
                                                                "/api/assignments/admin/**",
                                                                "/api/features/workout/create",
                                                                "/api/diet-plans/admin/**",
                                                                "/api/workout-assignments/admin/**")
                                                .hasRole("ADMIN")
                                                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                                                .requestMatchers("/api/user/**", "/api/features/**",
                                                                "/api/assignments/user/**", "/api/assignments/**",
                                                                "/api/diet-plans/**",
                                                                "/api/workout-assignments/**")
                                                .hasAnyRole("USER", "ADMIN")
                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
                org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
                configuration.setAllowedOrigins(java.util.Arrays.asList("http://localhost:5173",
                                "http://localhost:3000", "http://localhost:5174"));
                configuration.setAllowedMethods(java.util.Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                configuration.setAllowedHeaders(java.util.List.of("*"));
                configuration.setAllowCredentials(true);
                org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}
