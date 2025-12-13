package com.blooddonationapp.backend.service;

import com.blooddonationapp.backend.dto.BloodRequestResponseDto;
import com.blooddonationapp.backend.dto.DonorMatchDto;
import com.blooddonationapp.backend.model.BloodRequest;
import com.blooddonationapp.backend.model.Donor;
import com.blooddonationapp.backend.repository.BloodRequestRepository;
import com.blooddonationapp.backend.repository.DonorRepository;
import com.blooddonationapp.backend.util.DonorAIUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BloodRequestService {

    private final BloodRequestRepository requestRepo;
    private final DonorRepository donorRepo;
    private final DonorNotificationService notificationService;
    private final AdminNotificationService adminNotificationService;

    public BloodRequestService(
            BloodRequestRepository requestRepo,
            DonorRepository donorRepo,
            DonorNotificationService notificationService,
            AdminNotificationService adminNotificationService) {
        this.requestRepo = requestRepo;
        this.donorRepo = donorRepo;
        this.notificationService = notificationService;
        this.adminNotificationService = adminNotificationService;
    }

    public BloodRequestResponseDto createRequest(BloodRequestResponseDto requestDto) {

        BloodRequest request = new BloodRequest();
        request.setPatientBloodType(requestDto.getPatientBloodType());
        request.setUrgencyLevel(requestDto.getUrgencyLevel());
        request.setHospitalName(requestDto.getHospitalName());
        request.setHospitalLocation(requestDto.getHospitalLocation());
        request.setNotes(requestDto.getNotes());
        request.setCreatedAt(LocalDateTime.now());

        BloodRequest savedRequest = requestRepo.save(request);

        List<DonorMatchDto> matches = buildMatchesForRequest(savedRequest);
        savedRequest.setRecommendedDonors(matches);

        requestDto.setId(savedRequest.getId());
        requestDto.setRecommendedDonors(matches);

        List<Long> donorIds = matches.stream()
                .map(DonorMatchDto::getDonorId)
                .collect(Collectors.toList());

        notificationService.sendBatchNotifications(
                donorIds,
                savedRequest.getId().intValue()
        );

        adminNotificationService.createAdminNotification(
                "New blood request – Blood Type: " + savedRequest.getPatientBloodType(),
                savedRequest.getId().intValue()
        );

        return requestDto;
    }

    public BloodRequestResponseDto getMatchesForRequestId(Long requestId) {
        BloodRequest req = requestRepo.findById(requestId).orElse(null);
        if (req == null) {
            BloodRequestResponseDto empty = new BloodRequestResponseDto();
            empty.setId(requestId);
            empty.setRecommendedDonors(List.of());
            return empty;
        }

        List<DonorMatchDto> matches = buildMatchesForRequest(req);

        BloodRequestResponseDto dto = new BloodRequestResponseDto();
        dto.setId(req.getId());
        dto.setPatientBloodType(req.getPatientBloodType());
        dto.setUrgencyLevel(req.getUrgencyLevel());
        dto.setHospitalName(req.getHospitalName());
        dto.setHospitalLocation(req.getHospitalLocation());
        dto.setNotes(req.getNotes());
        dto.setCreatedAt(req.getCreatedAt());
        dto.setRecommendedDonors(matches);

        return dto;
    }

    public BloodRequestResponseDto getLatestRequest() {
        BloodRequest req = requestRepo.findTopByOrderByCreatedAtDesc();
        if (req == null) return null;

        BloodRequestResponseDto dto = new BloodRequestResponseDto();
        dto.setId(req.getId());
        dto.setPatientBloodType(req.getPatientBloodType());
        dto.setUrgencyLevel(req.getUrgencyLevel());
        dto.setHospitalName(req.getHospitalName());
        dto.setHospitalLocation(req.getHospitalLocation());
        dto.setNotes(req.getNotes());
        dto.setCreatedAt(req.getCreatedAt());

        return dto;
    }

    private List<DonorMatchDto> buildMatchesForRequest(BloodRequest request) {
        List<Donor> donors = donorRepo.findAll();

        return donors.stream()
                .filter(d -> isCompatible(request.getPatientBloodType(), d.getBloodType()))
                .map(d -> {

                    int age = LocalDateTime.now().getYear() - d.getDateOfBirth().getYear();

                    double matchingScore = DonorAIUtils.getMatchingScore(
                            request.getPatientBloodType(),
                            d.getBloodType()
                    );

                    double responseScore = DonorAIUtils.getResponseScore(
                            d.getTotalRequestsSent(),
                            d.getTotalResponses()
                    );

                    double rawDistanceScore = DonorAIUtils.distanceScore(
                            d.getCity(),
                            d.getZipCode(),
                            request.getHospitalLocation(),
                            request.getHospitalZip()
                    );

                    double normalizedDistance = rawDistanceScore / 25.0;

                    double score =
                            (matchingScore * 5.0) +
                                    (responseScore * 2.0) +
                                    (normalizedDistance * 3.0);

                    score = Math.round(score * 100.0) / 100.0;

                    String summary = "This donor is a strong match based on compatibility, location, and reliability.";

                    String breakdown =
                            "Blood-type match: +" + (matchingScore * 5.0) + "\n" +
                                    "Distance score: +" + (normalizedDistance * 3.0) + "\n" +
                                    "Reliability history: +" + (responseScore * 2.0) + "\n";

                    return new DonorMatchDto(
                            d.getDonorId(),
                            d.getFirstName(),
                            d.getLastName(),
                            d.getBloodType(),
                            d.getCity(),
                            d.getZipCode(),
                            age,
                            score,
                            summary,
                            breakdown
                    );
                })
                .sorted(Comparator.comparingDouble(DonorMatchDto::getScore).reversed())
                .limit(10)
                .collect(Collectors.toList());
    }

    private boolean isCompatible(String patientType, String donorType) {
        if (patientType == null || donorType == null) return false;

        patientType = patientType.trim().toUpperCase();
        donorType = donorType.trim().toUpperCase();

        switch (patientType) {
            case "O-": return donorType.equals("O-");
            case "O+": return donorType.equals("O-") || donorType.equals("O+");
            case "A-": return donorType.equals("A-") || donorType.equals("O-");
            case "A+": return donorType.equals("A+") || donorType.equals("A-")
                    || donorType.equals("O+") || donorType.equals("O-");
            case "B-": return donorType.equals("B-") || donorType.equals("O-");
            case "B+": return donorType.equals("B+") || donorType.equals("B-")
                    || donorType.equals("O+") || donorType.equals("O-");
            case "AB-": return donorType.equals("AB-") || donorType.equals("A-")
                    || donorType.equals("B-") || donorType.equals("O-");
            case "AB+": return true;
            default: return false;
        }
    }
}
