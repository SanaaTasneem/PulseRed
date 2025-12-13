package com.blooddonationapp.backend.dto;

import java.util.Map;

public class AIMetricsDto {

    private Map<String, Long> bloodTypeCounts;
    private String interpretation;

    public AIMetricsDto() {}

    public AIMetricsDto(Map<String, Long> bloodTypeCounts, String interpretation) {
        this.bloodTypeCounts = bloodTypeCounts;
        this.interpretation = interpretation;
    }

    public Map<String, Long> getBloodTypeCounts() {
        return bloodTypeCounts;
    }

    public void setBloodTypeCounts(Map<String, Long> bloodTypeCounts) {
        this.bloodTypeCounts = bloodTypeCounts;
    }

    public String getInterpretation() {
        return interpretation;
    }

    public void setInterpretation(String interpretation) {
        this.interpretation = interpretation;
    }
}
