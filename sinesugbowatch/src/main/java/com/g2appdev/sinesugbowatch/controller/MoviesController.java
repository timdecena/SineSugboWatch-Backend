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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.g2appdev.sinesugbowatch.entity.MoviesEntity;
import com.g2appdev.sinesugbowatch.service.MoviesService;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000") // allow specific origin
public class MoviesController {

    @Autowired
    MoviesService moviesService;

    @GetMapping("/print")
    public String print() {
        return "Hello, Movies Management!";
    }

    // Create operation of CRUD
    @PostMapping("/postMovieRecord")
    public MoviesEntity postMovieRecord(@RequestBody MoviesEntity movie) {
        return moviesService.postMovieRecord(movie);
    }

    // Read operation of CRUD
    @GetMapping("/getAllMovies")
    public List<MoviesEntity> getAllMovies() {
        return moviesService.getAllMovies();
    }

    // Update operation of CRUD
    @PutMapping("/putMovieDetails")
    public MoviesEntity putMovieDetails(@RequestParam int id, @RequestBody MoviesEntity newMovieDetails) {
        return moviesService.putMovieDetails(id, newMovieDetails);
    }

    // Delete operation of CRUD
    @DeleteMapping("/deleteMovieDetails/{id}")
    public String deleteMovie(@PathVariable int id) {
        return moviesService.deleteMovie(id);
    }
}
