package com.blooddonationapp.backend.repository;

import com.blooddonationapp.backend.model.AdminNotification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminNotificationRepository extends JpaRepository<AdminNotification, Integer> {}
