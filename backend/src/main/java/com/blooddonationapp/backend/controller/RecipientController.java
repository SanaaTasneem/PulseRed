package com.blooddonationapp.backend.controller;

import com.blooddonationapp.backend.model.Recipient;
import com.blooddonationapp.backend.service.RecipientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipients")
@CrossOrigin(origins = "http://localhost:3000")
public class RecipientController {

    private final RecipientService recipientService;

    public RecipientController(RecipientService recipientService) {
        this.recipientService = recipientService;
    }

    @GetMapping
    public List<Recipient> getAllRecipients() {
        return recipientService.getAllRecipients();
    }

    @GetMapping("/{id}")
    public Recipient getRecipientById(@PathVariable Integer id) {
        return recipientService.getRecipientById(id);
    }

    @PostMapping
    public Recipient createRecipient(@RequestBody Recipient recipient) {
        return recipientService.saveRecipient(recipient);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipient(@PathVariable Integer id) {
        recipientService.deleteRecipient(id);
    }
}
