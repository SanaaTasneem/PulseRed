package com.blooddonationapp.backend.repository;

import com.blooddonationapp.backend.model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonorRepository extends JpaRepository<Donor, Long> {

    List<Donor> findByBloodType(String bloodType);

    long countByBloodType(String bloodType);
}
