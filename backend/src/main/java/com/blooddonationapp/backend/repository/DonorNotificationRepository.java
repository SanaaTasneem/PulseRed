package com.blooddonationapp.backend.repository;

import com.blooddonationapp.backend.model.DonorNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DonorNotificationRepository extends JpaRepository<DonorNotification, Integer> {

    List<DonorNotification> findByDonorId(Integer donorId);

    List<DonorNotification> findByRequestId(Integer requestId);
}
