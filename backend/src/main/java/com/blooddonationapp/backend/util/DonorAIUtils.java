package com.blooddonationapp.backend.util;

public class DonorAIUtils {

    public static double getMatchingScore(String patientBloodType, String donorBloodType) {
        if (patientBloodType == null || donorBloodType == null) return 0.0;

        String patient = patientBloodType.trim().toUpperCase();
        String donor = donorBloodType.trim().toUpperCase();

        if (patient.equals(donor)) return 1.0;

        if (donor.equals("O-")) return 0.9;

        if (donor.equals("O+") && patient.endsWith("+")) return 0.8;

        if (sameGroup(patient, donor) && rh(patient) != rh(donor)) return 0.85;

        if (group(donor).equals("O") && !group(patient).equals("O")) {
            return patient.endsWith("+") ? 0.75 : 0.7;
        }

        if (patient.equals("AB+")) return 0.6;

        return 0.0;
    }

    public static double getResponseScore(Integer totalRequestsSent, Integer totalResponses) {
        if (totalRequestsSent == null || totalResponses == null || totalRequestsSent == 0) {
            return 0.5; // neutral baseline when no history
        }
        double rate = (double) totalResponses / totalRequestsSent;
        if (rate < 0.0) rate = 0.0;
        if (rate > 1.0) rate = 1.0;
        return rate;
    }

    public static double getFinalScore(double matchingScore, double responseScore) {
        return (matchingScore * 0.7) + (responseScore * 0.3);
    }

    public static double getUrgencyScore(String urgencyLevel) {
        if (urgencyLevel == null) return 0.6;
        String level = urgencyLevel.trim().toUpperCase();

        switch (level) {
            case "HIGH":
            case "CRITICAL":
                return 1.0;
            case "MEDIUM":
                return 0.75;
            case "LOW":
                return 0.5;
            default:
                return 0.6;
        }
    }

    private static String group(String bloodType) {
        if (bloodType == null || bloodType.isEmpty()) return "";
        char c = bloodType.charAt(0);
        if (c == 'A' || c == 'B' || c == 'O') {
            if (bloodType.startsWith("AB")) return "AB";
            return String.valueOf(c);
        }
        if (bloodType.startsWith("AB")) return "AB";
        return "";
    }

    private static char rh(String bloodType) {
        if (bloodType == null || bloodType.isEmpty()) return '+';
        char last = bloodType.charAt(bloodType.length() - 1);
        if (last == '+' || last == '-') return last;
        return '+';
    }

    private static boolean sameGroup(String a, String b) {
        return group(a).equals(group(b));
    }

    public static double distanceScore(String donorCity, String donorZip,
                                       String hospitalCity, String hospitalZip) {

        if (donorCity == null || hospitalCity == null) return 0;

        donorCity = donorCity.trim().toLowerCase();
        hospitalCity = hospitalCity.trim().toLowerCase();

        if (donorCity.equals(hospitalCity)) {
            return 25;
        }

        if (donorZip != null && hospitalZip != null &&
                donorZip.length() >= 3 && hospitalZip.length() >= 3) {

            if (donorZip.substring(0, 3).equals(hospitalZip.substring(0, 3))) {
                return 18;
            }
        }

        java.util.Map<String, java.util.List<String>> nearby =
                java.util.Map.of(
                        "chicago", java.util.List.of("evanston", "skokie", "oak park", "cicero", "lincolnwood"),
                        "new york", java.util.List.of("manhattan", "brooklyn", "queens", "bronx"),
                        "manhattan", java.util.List.of("new york"),
                        "brooklyn", java.util.List.of("new york"),
                        "queens", java.util.List.of("new york")
                );

        java.util.List<String> near = nearby.getOrDefault(hospitalCity, java.util.List.of());
        if (near.contains(donorCity)) {
            return 12;
        }

        return 5;
    }
}
