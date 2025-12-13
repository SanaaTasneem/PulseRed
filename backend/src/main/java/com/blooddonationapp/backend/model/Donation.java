package com.blooddonationapp.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "donation")
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "donor_id", nullable = false)
    private Integer donorId;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "donation_date")
    private LocalDateTime donationDate;

    public Donation() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDonorId() {
        return donorId;
    }

    public void setDonorId(Integer donorId) {
        this.donorId = donorId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public LocalDateTime getDonationDate() {
        return donationDate;
    }

    public void setDonationDate(LocalDateTime donationDate) {
        this.donationDate = donationDate;
    }

    @PrePersist
    public void prePersist() {
        if (donationDate == null) {
            donationDate = LocalDateTime.now();
        }
    }
}
