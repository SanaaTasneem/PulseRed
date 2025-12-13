package com.blooddonationapp.backend.controller;

import com.blooddonationapp.backend.model.DonorNotification;
import com.blooddonationapp.backend.service.DonorNotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class DonorNotificationController {

    private final DonorNotificationService notificationService;

    public DonorNotificationController(DonorNotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // 👉 required by frontend
    @GetMapping
    public List<DonorNotification> getAllNotifications() {
        return notificationService.findAll();
    }

    @GetMapping("/request/{requestId}")
    public List<DonorNotification> getByRequest(@PathVariable Integer requestId) {
        return notificationService.findByRequestId(requestId);
    }

    @PostMapping("/{id}/respond")
    public DonorNotification respond(@PathVariable Integer id) {
        return notificationService.markAsResponded(id);
    }
}
