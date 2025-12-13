package com.blooddonationapp.backend.controller;

import com.blooddonationapp.backend.dto.BloodRequestResponseDto;
import com.blooddonationapp.backend.service.BloodRequestService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blood-request")
@CrossOrigin(origins = "http://localhost:3000")
public class BloodRequestController {

    private final BloodRequestService requestService;

    public BloodRequestController(BloodRequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping("/create")
    public BloodRequestResponseDto createRequest(@RequestBody BloodRequestResponseDto requestDto) {
        return requestService.createRequest(requestDto);
    }

    @GetMapping("/latest")
    public BloodRequestResponseDto getLatestRequest() {
        return requestService.getLatestRequest();
    }
}
