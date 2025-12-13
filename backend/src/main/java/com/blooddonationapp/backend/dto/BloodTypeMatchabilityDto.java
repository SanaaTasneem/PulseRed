package com.blooddonationapp.backend.dto;

public class BloodTypeMatchabilityDto {

    private String bloodType;
    private double score; // 0–10 scale

    public BloodTypeMatchabilityDto() {
    }

    public BloodTypeMatchabilityDto(String bloodType, double score) {
        this.bloodType = bloodType;
        this.score = score;
    }

    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
