package com.blooddonationapp.backend.controller;

import com.blooddonationapp.backend.dto.BloodTypeMatchabilityDto;
import com.blooddonationapp.backend.repository.DonorRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIMetricsController {

    private final DonorRepository donorRepo;

    public AIMetricsController(DonorRepository donorRepo) {
        this.donorRepo = donorRepo;
    }

    @GetMapping("/matchability")
    public List<BloodTypeMatchabilityDto> getMatchability() {
        String[] bloodTypes = {"O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"};

        List<BloodTypeMatchabilityDto> result = new ArrayList<>();
        long maxCount = 0;

        long[] counts = new long[bloodTypes.length];
        for (int i = 0; i < bloodTypes.length; i++) {
            long count = donorRepo.countByBloodType(bloodTypes[i]);
            counts[i] = count;
            if (count > maxCount) {
                maxCount = count;
            }
        }

        for (int i = 0; i < bloodTypes.length; i++) {
            double score;
            if (maxCount == 0) {
                score = 0.0;
            } else {
                score = ((double) counts[i] / (double) maxCount) * 10.0;
            }

            score = Math.round(score * 10.0) / 10.0;

            result.add(new BloodTypeMatchabilityDto(bloodTypes[i], score));
        }

        return result;
    }

    @GetMapping("/metrics")
    public Map<String, Object> getMetrics() {

        String[] bloodTypes = {"O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"};

        Map<String, Long> counts = new LinkedHashMap<>();

                for (String type : bloodTypes) {
            long c = donorRepo.countByBloodType(type);
            counts.put(type, c);
        }

        String bestType = null;
        String worstType = null;
        long best = -1;
        long worst = Long.MAX_VALUE;

        for (Map.Entry<String, Long> e : counts.entrySet()) {
            long c = e.getValue();

            if (c > best) {
                best = c;
                bestType = e.getKey();
            }
            if (c < worst) {
                worst = c;
                worstType = e.getKey();
            }
        }

        String interpretation;

        if (best == 0) {
            interpretation = "AI could not generate insights because no donors exist yet.";
        } else {
            interpretation =
                    bestType + " has the strongest matchability with " + best + " donor(s) available. "
                            + worstType + " is currently the most difficult type to match, with only "
                            + worst + " donor(s). AI recommends focused donor recruitment for "
                            + worstType + ".";
        }

        // return JSON object
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("bloodTypeCounts", counts);
        response.put("interpretation", interpretation);

        return response;
    }
}
