package com.blooddonationapp.backend.repository;

import com.blooddonationapp.backend.model.Recipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipientRepository extends JpaRepository<Recipient, Integer> {

}
