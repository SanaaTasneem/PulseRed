package com.blooddonationapp.backend.security;

import com.blooddonationapp.backend.model.User;
import com.blooddonationapp.backend.model.Role;
import com.blooddonationapp.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UserDataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDataSeeder(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("admin@hospital.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@hospital.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setCreatedAt(LocalDateTime.now());
            userRepository.save(admin);
        }

        if (userRepository.findByEmail("staff@hospital.com").isEmpty()) {
            User staff = new User();
            staff.setEmail("staff@hospital.com");
            staff.setPassword(passwordEncoder.encode("staff123"));
            staff.setRole(Role.STAFF);
            staff.setCreatedAt(LocalDateTime.now());
            userRepository.save(staff);
        }
    }
}
