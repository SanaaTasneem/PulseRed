package com.blooddonationapp.backend.service;

import com.blooddonationapp.backend.model.Recipient;
import com.blooddonationapp.backend.repository.RecipientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipientService {

    private final RecipientRepository recipientRepository;

    public RecipientService(RecipientRepository recipientRepository) {
        this.recipientRepository = recipientRepository;
    }

    public List<Recipient> getAllRecipients() {
        return recipientRepository.findAll();
    }

    public Recipient getRecipientById(Integer id) {
        return recipientRepository.findById(id).orElse(null);
    }

    public Recipient saveRecipient(Recipient recipient) {
        return recipientRepository.save(recipient);
    }

    public void deleteRecipient(Integer id) {
        recipientRepository.deleteById(id);
    }
}
