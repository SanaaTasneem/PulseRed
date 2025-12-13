package com.blooddonationapp.backend.controller;

import com.blooddonationapp.backend.dto.RecentDonationDto;
import com.blooddonationapp.backend.model.Donation;
import com.blooddonationapp.backend.service.DonationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "http://localhost:3000")
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping
    public Donation recordDonation(@RequestBody Donation donation) {
        return donationService.saveDonation(donation);
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationService.getAllDonations();
    }

    @GetMapping("/donor/{donorId}")
    public List<Donation> getByDonor(@PathVariable Integer donorId) {
        return donationService.getDonationsByDonorId(donorId);
    }

    @DeleteMapping("/{id}")
    public void deleteDonation(@PathVariable Integer id) {
        donationService.deleteDonation(id);
    }

    @GetMapping("/recent")
    public List<RecentDonationDto> getRecentDonations() {
        return donationService.getRecentDonations();
    }
}
