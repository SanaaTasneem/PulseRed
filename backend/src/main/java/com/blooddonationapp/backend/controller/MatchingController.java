package com.blooddonationapp.backend.controller;

import com.blooddonationapp.backend.dto.BloodRequestResponseDto;
import com.blooddonationapp.backend.service.BloodRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/matching")
@CrossOrigin(origins = "http://localhost:3000")
public class MatchingController {

    private final BloodRequestService requestService;

    public MatchingController(BloodRequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping("/request/{requestId}")
    public ResponseEntity<BloodRequestResponseDto> getMatches(@PathVariable Long requestId) {

        BloodRequestResponseDto result = requestService.getMatchesForRequestId(requestId);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }
}
