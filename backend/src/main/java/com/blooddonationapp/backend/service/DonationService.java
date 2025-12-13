package com.blooddonationapp.backend.service;

import com.blooddonationapp.backend.dto.RecentDonationDto;
import com.blooddonationapp.backend.model.Donation;
import com.blooddonationapp.backend.model.Donor;
import com.blooddonationapp.backend.model.Notification;
import com.blooddonationapp.backend.repository.DonationRepository;
import com.blooddonationapp.backend.repository.DonorRepository;
import com.blooddonationapp.backend.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class DonationService {

    private final DonationRepository donationRepository;
    private final DonorRepository donorRepository;
    private final NotificationRepository notificationRepository;

    public DonationService(DonationRepository donationRepository,
                           DonorRepository donorRepository,
                           NotificationRepository notificationRepository) {
        this.donationRepository = donationRepository;
        this.donorRepository = donorRepository;
        this.notificationRepository = notificationRepository;
    }

    public Donation saveDonation(Donation donation) {
        if (donation.getDonationDate() == null) {
            donation.setDonationDate(LocalDateTime.now());
        }

        Donation saved = donationRepository.save(donation);

        if (saved.getDonorId() != null) {
            Long donorIdLong = saved.getDonorId().longValue();
            Donor donor = donorRepository.findById(donorIdLong).orElse(null);
            if (donor != null) {
                donor.setLastDonationDate(saved.getDonationDate().toLocalDate());
                donorRepository.save(donor);

                LocalDate nextEligible = donor.getLastDonationDate().plusDays(45);
                String message = "Thank you for donating! You will be eligible to donate again on " + nextEligible + ".";

                Notification notification = new Notification(
                        donor.getDonorId(),
                        message,
                        "PENDING",
                        LocalDateTime.now()
                );
                notificationRepository.save(notification);
            }
        }

        return saved;
    }

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public List<Donation> getDonationsByDonorId(Integer donorId) {
        return donationRepository.findByDonorId(donorId);
    }

    public void deleteDonation(Integer id) {
        donationRepository.deleteById(id);
    }

    public List<RecentDonationDto> getRecentDonations() {
        List<Donation> donations = donationRepository.findAll();
        donations.sort(Comparator.comparing(Donation::getDonationDate).reversed());

        List<RecentDonationDto> result = new ArrayList<>();
        int limit = Math.min(donations.size(), 10);

        for (int i = 0; i < limit; i++) {
            Donation donation = donations.get(i);
            String donorName = "Unknown Donor";
            String bloodType = "";

            if (donation.getDonorId() != null) {
                Long donorIdLong = donation.getDonorId().longValue();
                Donor donor = donorRepository.findById(donorIdLong).orElse(null);
                if (donor != null) {
                    donorName = donor.getFirstName() + " " + donor.getLastName();
                    bloodType = donor.getBloodType();
                }
            }

            LocalDateTime date = donation.getDonationDate();

            RecentDonationDto dto = new RecentDonationDto(
                    donation.getId(),
                    donation.getDonorId().longValue(),
                    donorName,
                    bloodType,
                    donation.getAmount(),
                    date
            );

            result.add(dto);
        }

        return result;
    }
}
