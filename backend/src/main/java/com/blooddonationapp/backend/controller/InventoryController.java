package com.blooddonationapp.backend.controller;

import com.blooddonationapp.backend.model.Inventory;
import com.blooddonationapp.backend.service.InventoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:3000")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // Get all blood inventory
    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    // Get by ID
    @GetMapping("/{id}")
    public Inventory getInventoryById(@PathVariable Integer id) {
        return inventoryService.getInventoryById(id);
    }

    // Get by blood type
    @GetMapping("/type/{bloodType}")
    public Inventory getByBloodType(@PathVariable String bloodType) {
        return inventoryService.getByBloodType(bloodType);
    }

    // Add or update inventory
    @PostMapping
    public Inventory saveInventory(@RequestBody Inventory inventory) {
        return inventoryService.saveInventory(inventory);
    }

    // Delete a record
    @DeleteMapping("/{id}")
    public void deleteInventory(@PathVariable Integer id) {
        inventoryService.deleteInventory(id);
    }
}
