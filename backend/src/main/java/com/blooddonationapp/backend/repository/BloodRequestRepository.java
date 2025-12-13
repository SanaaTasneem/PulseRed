package com.blooddonationapp.backend.repository;

import com.blooddonationapp.backend.model.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {

    BloodRequest findTopByOrderByCreatedAtDesc();
}
