package com.blooddonationapp.backend.repository;

import com.blooddonationapp.backend.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Integer> {

    List<Donation> findByDonorId(Integer donorId);

    List<Donation> findAllByOrderByDonationDateDesc();

    List<Donation> findTop10ByOrderByDonationDateDesc();
}
