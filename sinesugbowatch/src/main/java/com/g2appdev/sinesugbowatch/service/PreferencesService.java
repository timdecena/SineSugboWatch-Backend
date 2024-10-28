package com.g2appdev.sinesugbowatch.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.sinesugbowatch.entity.PreferencesEntity;
import com.g2appdev.sinesugbowatch.entity.UserEntity;
import com.g2appdev.sinesugbowatch.repository.PreferencesRepository;
import com.g2appdev.sinesugbowatch.repository.UserRepository;

@Service
public class PreferencesService {

    @Autowired
    PreferencesRepository preferencesRepo;
    
    @Autowired
    private UserRepository userRepo;

   

    // Create of CRUD
    public PreferencesEntity postPreferencesRecord(PreferencesEntity preferences) {
        UserEntity user = userRepo.findById(preferences.getUser().getUser_id())
        		.orElseThrow(()-> new NoSuchElementException("User with ID"+ preferences.getUser().getUser_id()+" does not exist."));
        preferences.setUser(user);
        return preferencesRepo.save(preferences);
    }

    // Read of CRUD
    public List<PreferencesEntity> getAllPreferences() {
        return preferencesRepo.findAll();
    }

    // Update of CRUD
    @SuppressWarnings("finally")
    public PreferencesEntity putPreferencesDetails(int id, PreferencesEntity newPreferencesDetails) {
        PreferencesEntity preferences = new PreferencesEntity();
        try {
            // Search for preferences by ID
            preferences = preferencesRepo.findById(id).orElseThrow(() -> 
                new NameNotFoundException("Preferences " + id + " not found")
            );

            // Update the fields with new values
            preferences.setRecommendations(newPreferencesDetails.getRecommendations());
            preferences.setPreferredgenres(newPreferencesDetails.getPreferredgenres());

        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Preferences " + id + " not found");
        } finally {
            return preferencesRepo.save(preferences);
        }
    }

    // Delete of CRUD
    public String deletePreferences(int id) {
        String msg = "";
        if (preferencesRepo.existsById(id)) {
            preferencesRepo.deleteById(id);
            msg = "Preferences record successfully deleted!";
        } else {
            msg = id + " Not Found!";
        }
        return msg;
    }
}
