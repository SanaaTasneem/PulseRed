package com.blooddonationapp.backend.model;

import com.blooddonationapp.backend.dto.DonorMatchDto;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "blood_requests")
public class BloodRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String patientBloodType;
    private String urgencyLevel;
    private String hospitalName;
    private String hospitalLocation;
    private String notes;

    @Column(name = "hospital_zip")
    private String hospitalZip;

    private String status;
    private Long assignedDonorId;

    private Double urgencyScore;
    private Double matchScore;

    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;
    private LocalDateTime updatedAt;

    @Transient
    private List<DonorMatchDto> recommendedDonors;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPatientBloodType() { return patientBloodType; }
    public void setPatientBloodType(String patientBloodType) { this.patientBloodType = patientBloodType; }

    public String getUrgencyLevel() { return urgencyLevel; }
    public void setUrgencyLevel(String urgencyLevel) { this.urgencyLevel = urgencyLevel; }

    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }

    public String getHospitalLocation() { return hospitalLocation; }
    public void setHospitalLocation(String hospitalLocation) { this.hospitalLocation = hospitalLocation; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getHospitalZip() { return hospitalZip; }
    public void setHospitalZip(String hospitalZip) { this.hospitalZip = hospitalZip; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getAssignedDonorId() { return assignedDonorId; }
    public void setAssignedDonorId(Long assignedDonorId) { this.assignedDonorId = assignedDonorId; }

    public Double getUrgencyScore() { return urgencyScore; }
    public void setUrgencyScore(Double urgencyScore) { this.urgencyScore = urgencyScore; }

    public Double getMatchScore() { return matchScore; }
    public void setMatchScore(Double matchScore) { this.matchScore = matchScore; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<DonorMatchDto> getRecommendedDonors() { return recommendedDonors; }
    public void setRecommendedDonors(List<DonorMatchDto> recommendedDonors) { this.recommendedDonors = recommendedDonors; }
}
