package com.g2appdev.sinesugbowatch.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.sinesugbowatch.entity.SearchEntity;
import com.g2appdev.sinesugbowatch.repository.SearchRepository;

@Service
public class SearchService {

    @Autowired
    SearchRepository searchRepo;

    // Create of CRUD
    public SearchEntity postSearchRecord(SearchEntity search) {
        return searchRepo.save(search);
    }

    // Read of CRUD
    public List<SearchEntity> getAllSearches() {
        return searchRepo.findAll();
    }

    // Update of CRUD
    @SuppressWarnings("finally")
    public SearchEntity putSearchDetails(int id, SearchEntity newSearchDetails) {
        SearchEntity search = new SearchEntity();
        try {
            // Search for search record by ID
            search = searchRepo.findById(id).orElseThrow(() -> 
                new NameNotFoundException("Search " + id + " not found")
            );

            // Update the fields with new values
            search.setSearchquery(newSearchDetails.getSearchquery());
            search.setSearchdate(newSearchDetails.getSearchdate());

        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Search " + id + " not found");
        } finally {
            return searchRepo.save(search);
        }
    }

    // Delete of CRUD
    public String deleteSearch(int id) {
        String msg = "";
        if (searchRepo.existsById(id)) {
            searchRepo.deleteById(id);
            msg = "Search record successfully deleted!";
        } else {
            msg = id + " Not Found!";
        }
        return msg;
    }
}
