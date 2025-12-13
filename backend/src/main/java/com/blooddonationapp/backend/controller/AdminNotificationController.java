package com.blooddonationapp.backend.controller;

import com.blooddonationapp.backend.model.AdminNotification;
import com.blooddonationapp.backend.service.AdminNotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin-notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminNotificationController {

    private final AdminNotificationService service;

    public AdminNotificationController(AdminNotificationService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<AdminNotification> getAllNotifications() {
        return service.getAll();
    }

    @PatchMapping("/{id}/read")
    public AdminNotification markNotificationRead(@PathVariable Integer id) {
        return service.markAsRead(id);
    }
}
