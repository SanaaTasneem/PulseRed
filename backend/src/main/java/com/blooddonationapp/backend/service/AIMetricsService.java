package com.blooddonationapp.backend.service;

import com.blooddonationapp.backend.dto.AIMetricsDto;
import com.blooddonationapp.backend.repository.DonorRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class AIMetricsService {

    private final DonorRepository donorRepo;

    private final String[] bloodTypes =
            {"O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"};

    public AIMetricsService(DonorRepository donorRepo) {
        this.donorRepo = donorRepo;
    }

    public AIMetricsDto getMetrics() {

        Map<String, Long> counts = new LinkedHashMap<>();


        for (String type : bloodTypes) {
            long c = donorRepo.countByBloodType(type);
            counts.put(type, c);
        }

        String bestType = null;
        String worstType = null;
        long bestCount = -1;
        long worstCount = Long.MAX_VALUE;

        for (Map.Entry<String, Long> e : counts.entrySet()) {
            long c = e.getValue();
            if (c > bestCount) {
                bestCount = c;
                bestType = e.getKey();
            }
            if (c < worstCount) {
                worstCount = c;
                worstType = e.getKey();
            }
        }

        String interpretation;

        if (bestCount == 0) {
            interpretation =
                    "AI could not generate insights because no donor data exists yet.";
        } else {
            interpretation =
                    bestType + " shows the strongest donor availability with " + bestCount +
                            " registered donors. " +
                            worstType + " currently has the weakest representation with only " +
                            worstCount +
                            " donor(s). The AI recommends targeted donor recruitment for " +
                            worstType + ".";
        }

        return new AIMetricsDto(counts, interpretation);
    }
}
