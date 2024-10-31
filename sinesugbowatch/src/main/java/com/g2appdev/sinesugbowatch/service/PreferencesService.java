package com.g2appdev.sinesugbowatch.service;

import java.util.List;
import javax.naming.NameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.g2appdev.sinesugbowatch.entity.PreferencesEntity;
import com.g2appdev.sinesugbowatch.repository.PreferencesRepository;

@Service
public class PreferencesService {

    @Autowired
    PreferencesRepository preferencesRepo;

    public List<PreferencesEntity> getAllPreferences() {
        return preferencesRepo.findAll();
    }

    public PreferencesEntity updatePreferences(int id, PreferencesEntity updatedPreference) throws NameNotFoundException {
        PreferencesEntity preference = preferencesRepo.findById(id)
            .orElseThrow(() -> new NameNotFoundException("Preference with ID " + id + " not found."));
        
        preference.setRecommendations(updatedPreference.getRecommendations());
        preference.setPreferredGenres(updatedPreference.getPreferredGenres());
    
        return preferencesRepo.save(preference);
    }
    

    public String deletePreferences(int id) {
        if (preferencesRepo.existsById(id)) {
            preferencesRepo.deleteById(id);
            return "Preference successfully deleted!";
        } else {
            return "Preference not found!";
        }
    }
}
