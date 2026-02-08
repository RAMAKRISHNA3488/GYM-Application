package com.gym.backend;

import com.gym.backend.entity.Role;
import com.gym.backend.entity.User;
import com.gym.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner adminSeeder(
			UserRepository userRepository,
			PasswordEncoder passwordEncoder) {
		return args -> {
			Optional<User> adminOpt = userRepository.findByEmail("admin@gym.com");
			if (adminOpt.isEmpty()) {
				User admin = User.builder()
						.name("Admin")
						.email("admin@gym.com")
						.password(passwordEncoder.encode("admin123"))
						.role(Role.ADMIN)
						.build();
				userRepository.save(admin);
				System.out.println("Admin user seeded successfully.");
			} else {
				// Ensure admin has correct credentials and role
				User admin = adminOpt.get();
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setRole(Role.ADMIN); // Establish role if it was somehow changed
				userRepository.save(admin);
				System.out.println("Admin user updated successfully.");
			}
		};
	}
}
