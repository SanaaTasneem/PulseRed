package com.blooddonationapp.backend.dto;

import java.time.LocalDateTime;

public class RecentDonationDto {

    private Integer donationId;
    private Long donorId;
    private String donorName;
    private String bloodType;
    private Integer amount;
    private LocalDateTime donationDate;

    public RecentDonationDto() {
    }

    public RecentDonationDto(Integer donationId,
                             Long donorId,
                             String donorName,
                             String bloodType,
                             Integer amount,
                             LocalDateTime donationDate) {
        this.donationId = donationId;
        this.donorId = donorId;
        this.donorName = donorName;
        this.bloodType = bloodType;
        this.amount = amount;
        this.donationDate = donationDate;
    }

    public Integer getDonationId() {
        return donationId;
    }

    public void setDonationId(Integer donationId) {
        this.donationId = donationId;
    }

    public Long getDonorId() {
        return donorId;
    }

    public void setDonorId(Long donorId) {
        this.donorId = donorId;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
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
}
