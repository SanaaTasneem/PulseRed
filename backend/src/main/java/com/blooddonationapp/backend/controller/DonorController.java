package com.blooddonationapp.backend.controller;

import com.blooddonationapp.backend.model.Donor;
import com.blooddonationapp.backend.service.DonorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "http://localhost:3000")
public class DonorController {

    private final DonorService donorService;

    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    @PostMapping("/register")
    public Donor registerDonor(@RequestBody Donor donor) {
        return donorService.registerDonor(donor);
    }

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }

    @GetMapping("/{id}")
    public Donor getDonor(@PathVariable Long id) {
        return donorService.getDonorById(id);
    }
}
