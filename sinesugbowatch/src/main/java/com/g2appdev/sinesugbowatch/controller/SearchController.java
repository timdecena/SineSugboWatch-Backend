package com.g2appdev.sinesugbowatch.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.g2appdev.sinesugbowatch.entity.SearchEntity;
import com.g2appdev.sinesugbowatch.service.SearchService;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/search")
public class SearchController {

    @Autowired
    SearchService searchService;

    @GetMapping("/print")
    public String print() {
        return "Hello, Search Management!";
    }

    // Create operation of CRUD
    @PostMapping("/postSearchRecord")
    public SearchEntity postSearchRecord(@RequestBody SearchEntity search) {
        return searchService.postSearchRecord(search);
    }

    // Read operation of CRUD
    @GetMapping("/getAllSearches")
    public List<SearchEntity> getAllSearches() {
        return searchService.getAllSearches();
    }

    // Update operation of CRUD
    @PutMapping("/putSearchDetails")
    public SearchEntity putSearchDetails(@RequestParam int id, @RequestBody SearchEntity newSearchDetails) {
        return searchService.putSearchDetails(id, newSearchDetails);
    }

    // Delete operation of CRUD
    @DeleteMapping("/deleteSearchDetails/{id}")
    public String deleteSearch(@PathVariable int id) {
        return searchService.deleteSearch(id);
    }
}
