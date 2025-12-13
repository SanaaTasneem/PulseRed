package com.blooddonationapp.backend.service;

import com.blooddonationapp.backend.model.Inventory;
import com.blooddonationapp.backend.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    // Get all blood inventory records
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    // Get one by ID
    public Inventory getInventoryById(Integer id) {
        return inventoryRepository.findById(id).orElse(null);
    }

    // Get inventory by blood type
    public Inventory getByBloodType(String bloodType) {
        return inventoryRepository.findByBloodType(bloodType);
    }

    // Add or update inventory
    public Inventory saveInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // Delete inventory record
    public void deleteInventory(Integer id) {
        inventoryRepository.deleteById(id);
    }
}
