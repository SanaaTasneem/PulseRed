package com.blooddonationapp.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "donor_id")
    private Long donorId;

    @Column(name = "message", length = 500)
    private String message;

    @Column(name = "status")
    private String status; // PENDING, RESPONDED, IGNORED

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Column(name = "responded_at")
    private LocalDateTime respondedAt;

    public Notification() {}

    public Notification(Long donorId, String message, String status, LocalDateTime sentAt) {
        this.donorId = donorId;
        this.message = message;
        this.status = status;
        this.sentAt = sentAt;
    }

    public Long getId() { return id; }
    public Long getDonorId() { return donorId; }
    public void setDonorId(Long donorId) { this.donorId = donorId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getSentAt() { return sentAt; }
    public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }

    public LocalDateTime getRespondedAt() { return respondedAt; }
    public void setRespondedAt(LocalDateTime respondedAt) { this.respondedAt = respondedAt; }
}
