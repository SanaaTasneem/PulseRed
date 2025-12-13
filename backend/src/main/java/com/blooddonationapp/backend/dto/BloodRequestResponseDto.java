package com.blooddonationapp.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class BloodRequestResponseDto {

    private Long id;

    private String patientBloodType;
    private String urgencyLevel;
    private String hospitalName;
    private String hospitalLocation;
    private String notes;
    private LocalDateTime createdAt;

    private List<DonorMatchDto> recommendedDonors;

    public BloodRequestResponseDto() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPatientBloodType() {
        return patientBloodType;
    }

    public void setPatientBloodType(String patientBloodType) {
        this.patientBloodType = patientBloodType;
    }

    public String getUrgencyLevel() {
        return urgencyLevel;
    }

    public void setUrgencyLevel(String urgencyLevel) {
        this.urgencyLevel = urgencyLevel;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getHospitalLocation() {
        return hospitalLocation;
    }

    public void setHospitalLocation(String hospitalLocation) {
        this.hospitalLocation = hospitalLocation;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<DonorMatchDto> getRecommendedDonors() {
        return recommendedDonors;
    }

    public void setRecommendedDonors(List<DonorMatchDto> recommendedDonors) {
        this.recommendedDonors = recommendedDonors;
    }
}
