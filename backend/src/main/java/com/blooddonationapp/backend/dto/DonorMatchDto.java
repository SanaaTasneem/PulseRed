package com.blooddonationapp.backend.dto;

public class DonorMatchDto {

    private Long donorId;
    private String firstName;
    private String lastName;
    private String bloodType;
    private String city;
    private String zipCode;
    private Integer age;
    private double score;

    private String reasoningSummary;
    private String reasoningBreakdown;

    public DonorMatchDto() {
    }

    public DonorMatchDto(Long donorId,
                         String firstName,
                         String lastName,
                         String bloodType,
                         String city,
                         String zipCode,
                         Integer age,
                         double score) {
        this.donorId = donorId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bloodType = bloodType;
        this.city = city;
        this.zipCode = zipCode;
        this.age = age;
        this.score = score;
    }

    public DonorMatchDto(Long donorId,
                         String firstName,
                         String lastName,
                         String bloodType,
                         String city,
                         String zipCode,
                         Integer age,
                         double score,
                         String reasoningSummary,
                         String reasoningBreakdown) {
        this.donorId = donorId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bloodType = bloodType;
        this.city = city;
        this.zipCode = zipCode;
        this.age = age;
        this.score = score;
        this.reasoningSummary = reasoningSummary;
        this.reasoningBreakdown = reasoningBreakdown;
    }

    public Long getDonorId() {
        return donorId;
    }

    public void setDonorId(Long donorId) {
        this.donorId = donorId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    // ⭐ NEW GETTERS + SETTERS
    public String getReasoningSummary() {
        return reasoningSummary;
    }

    public void setReasoningSummary(String reasoningSummary) {
        this.reasoningSummary = reasoningSummary;
    }

    public String getReasoningBreakdown() {
        return reasoningBreakdown;
    }

    public void setReasoningBreakdown(String reasoningBreakdown) {
        this.reasoningBreakdown = reasoningBreakdown;
    }
}
