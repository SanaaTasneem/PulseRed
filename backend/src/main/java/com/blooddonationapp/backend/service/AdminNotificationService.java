package com.blooddonationapp.backend.service;

import com.blooddonationapp.backend.model.AdminNotification;
import com.blooddonationapp.backend.repository.AdminNotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminNotificationService {

    private final AdminNotificationRepository adminRepo;

    public AdminNotificationService(AdminNotificationRepository adminRepo) {
        this.adminRepo = adminRepo;
    }

    public List<AdminNotification> getAll() {
        return adminRepo.findAll()
                .stream()
                .sorted((a, b) -> b.getNotificationId() - a.getNotificationId())
                .toList();
    }

    public AdminNotification createAdminNotification(String message, Integer requestId) {
        AdminNotification notif = new AdminNotification();
        notif.setMessage(message);
        notif.setRequestId(requestId);
        notif.setCreatedAt(LocalDateTime.now());
        notif.setRead(false); // default unread
        return adminRepo.save(notif);
    }

    public AdminNotification markAsRead(Integer id) {
        AdminNotification notif = adminRepo.findById(id).orElse(null);
        if (notif == null) {
            return null;
        }
        notif.setRead(true);
        return adminRepo.save(notif);
    }
}
