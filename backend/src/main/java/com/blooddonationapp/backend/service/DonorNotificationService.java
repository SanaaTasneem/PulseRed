package com.blooddonationapp.backend.service;

import com.blooddonationapp.backend.model.DonorNotification;
import com.blooddonationapp.backend.model.AdminNotification;
import com.blooddonationapp.backend.repository.DonorNotificationRepository;
import com.blooddonationapp.backend.repository.AdminNotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DonorNotificationService {

    private final DonorNotificationRepository notificationRepo;
    private final AdminNotificationRepository adminNotificationRepository;

    public DonorNotificationService(DonorNotificationRepository notificationRepo,
                                    AdminNotificationRepository adminNotificationRepository) {
        this.notificationRepo = notificationRepo;
        this.adminNotificationRepository = adminNotificationRepository;
    }

    public List<DonorNotification> findAll() {
        return notificationRepo.findAll();
    }

    public List<DonorNotification> findByRequestId(Integer requestId) {
        return notificationRepo.findByRequestId(requestId);
    }

    public List<DonorNotification> sendBatchNotifications(List<Long> donorIds, Integer requestId) {
        List<DonorNotification> list = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for (Long donorIdLong : donorIds) {
            DonorNotification n = new DonorNotification();
            n.setDonorId(donorIdLong.intValue());
            n.setRequestId(requestId);
            n.setSentAt(now);
            n.setResponded(false);
            list.add(notificationRepo.save(n));
        }
        return list;
    }

    public DonorNotification markAsResponded(Integer notificationId) {
        DonorNotification n = notificationRepo.findById(notificationId).orElse(null);
        if (n == null) return null;

        n.setResponded(true);
        n.setRespondedAt(LocalDateTime.now());
        return notificationRepo.save(n);
    }

    public void createAdminNotification(String message, Integer requestId) {
        AdminNotification adminNotification = new AdminNotification();
        adminNotification.setMessage(message);
        adminNotification.setRequestId(requestId);
        adminNotification.setCreatedAt(LocalDateTime.now());
        adminNotificationRepository.save(adminNotification);
    }
}
