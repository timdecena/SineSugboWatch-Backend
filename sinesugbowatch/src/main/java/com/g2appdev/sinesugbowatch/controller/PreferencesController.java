package com.g2appdev.sinesugbowatch.controller;

import java.util.List;
import javax.naming.NameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.g2appdev.sinesugbowatch.entity.PreferencesEntity;
import com.g2appdev.sinesugbowatch.service.PreferencesService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/preferences")
public class PreferencesController {

    @Autowired
    PreferencesService preferencesService;

    @GetMapping("/getAllPreferences")
    public List<PreferencesEntity> getAllPreferences() {
        return preferencesService.getAllPreferences();
    }

    @PutMapping("/updatePreferencesDetails/{id}")
public ResponseEntity<?> updatePreferences(@PathVariable int id, @RequestBody PreferencesEntity updatedPreference) {
    try {
        PreferencesEntity updated = preferencesService.updatePreferences(id, updatedPreference);
        return ResponseEntity.ok(updated);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update preferences.");
    }
}


    @DeleteMapping("/deletePreferencesDetails/{id}")
    public ResponseEntity<String> deletePreferences(@PathVariable int id) {
        String message = preferencesService.deletePreferences(id);
        return ResponseEntity.ok(message);
    }
}
