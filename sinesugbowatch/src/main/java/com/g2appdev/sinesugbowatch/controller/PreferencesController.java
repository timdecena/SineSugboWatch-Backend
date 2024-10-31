package com.g2appdev.sinesugbowatch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.g2appdev.sinesugbowatch.entity.PreferencesEntity;
import com.g2appdev.sinesugbowatch.service.PreferencesService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/preferences")
public class PreferencesController {

    @Autowired
    PreferencesService preferencesService;

    @GetMapping("/print")
    public String print() {
        return "Hello, Preferences Management!";
    }

    // Create operation of CRUD
    @PostMapping("/postPreferencesRecord")
    public PreferencesEntity postPreferencesRecord(@RequestBody PreferencesEntity preferences) {
        return preferencesService.postPreferencesRecord(preferences);
    }

    // Read all preferences
    @GetMapping("/getAllPreferences")
    public List<PreferencesEntity> getAllPreferences() {
        return preferencesService.getAllPreferences();
    }

    // Read preference by ID
    @GetMapping("/{id}")
    public PreferencesEntity getPreferenceById(@PathVariable int id) {
        return preferencesService.getPreferenceById(id);
    }

    // Update operation of CRUD
    @PutMapping("/putPreferencesDetails")
    public PreferencesEntity putPreferencesDetails(@RequestParam int id, @RequestBody PreferencesEntity newPreferencesDetails) {
        return preferencesService.putPreferencesDetails(id, newPreferencesDetails);
    }

    // Delete operation of CRUD
    @DeleteMapping("/deletePreferencesDetails/{id}")
    public String deletePreferences(@PathVariable int id) {
        return preferencesService.deletePreferences(id);
    }
}
