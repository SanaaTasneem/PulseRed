package com.blooddonationapp.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "donors")
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donor_id")
    private Long donorId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "blood_type")
    private String bloodType;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_donation_date")
    private LocalDate lastDonationDate;

    @Column(name = "city")
    private String city;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "total_requests_sent")
    private Integer totalRequestsSent;

    @Column(name = "total_responses")
    private Integer totalResponses;

    @Column(name = "last_response_at")
    private LocalDateTime lastResponseAt;

    public Donor() {}

    // Getters and Setters

    public Long getDonorId() { return donorId; }
    public void setDonorId(Long donorId) { this.donorId = donorId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getBloodType() { return bloodType; }
    public void setBloodType(String bloodType) { this.bloodType = bloodType; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDate getLastDonationDate() { return lastDonationDate; }
    public void setLastDonationDate(LocalDate lastDonationDate) { this.lastDonationDate = lastDonationDate; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public Integer getTotalRequestsSent() { return totalRequestsSent; }
    public void setTotalRequestsSent(Integer totalRequestsSent) { this.totalRequestsSent = totalRequestsSent; }

    public Integer getTotalResponses() { return totalResponses; }
    public void setTotalResponses(Integer totalResponses) { this.totalResponses = totalResponses; }

    public LocalDateTime getLastResponseAt() { return lastResponseAt; }
    public void setLastResponseAt(LocalDateTime lastResponseAt) { this.lastResponseAt = lastResponseAt; }
}
