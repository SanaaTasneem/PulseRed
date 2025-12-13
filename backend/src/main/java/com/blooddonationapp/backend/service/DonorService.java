package com.blooddonationapp.backend.service;

import com.blooddonationapp.backend.model.Donation;
import com.blooddonationapp.backend.model.Donor;
import com.blooddonationapp.backend.repository.DonationRepository;
import com.blooddonationapp.backend.repository.DonorRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DonorService {

    private final DonorRepository donorRepository;
    private final DonationRepository donationRepository;

    public DonorService(DonorRepository donorRepository, DonationRepository donationRepository) {
        this.donorRepository = donorRepository;
        this.donationRepository = donationRepository;
    }

    public Donor registerDonor(Donor donor) {
        donor.setCreatedAt(LocalDateTime.now());
        Donor saved = donorRepository.save(donor);

        Donation firstDonation = new Donation();
        firstDonation.setDonorId(saved.getDonorId().intValue());
        firstDonation.setAmount(1);
        firstDonation.setDonationDate(LocalDateTime.now());
        donationRepository.save(firstDonation);

        saved.setLastDonationDate(LocalDate.now());
        donorRepository.save(saved);

        return saved;
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    public Donor getDonorById(Long id) {
        return donorRepository.findById(id).orElse(null);
    }
}
