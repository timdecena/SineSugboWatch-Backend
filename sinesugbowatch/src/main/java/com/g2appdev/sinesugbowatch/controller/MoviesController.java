package com.g2appdev.sinesugbowatch.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private MoviesService moviesService;

    @GetMapping("/print")
    public String print() {
        return "Hello, Movies Management!";
    }

    // Create operation of CRUD
    @PostMapping("/postMovieRecord")
    public ResponseEntity<MoviesEntity> postMovieRecord(@RequestBody MoviesEntity movie) {
        return ResponseEntity.ok(moviesService.postMovieRecord(movie));
    }

    // Read operation of CRUD
    @GetMapping("/getAllMovies")
    public ResponseEntity<List<MoviesEntity>> getAllMovies() {
        return ResponseEntity.ok(moviesService.getAllMovies());
    }

    // Update operation of CRUD
    @PutMapping("/putMovieDetails/{id}")
    public ResponseEntity<?> putMovieDetails(@PathVariable int id, @RequestBody MoviesEntity newMovieDetails) {
        try {
            MoviesEntity updatedMovie = moviesService.putMovieDetails(id, newMovieDetails);
            return ResponseEntity.ok(updatedMovie);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update movie.");
        }
    }

    // Delete operation of CRUD
    @DeleteMapping("/deleteMovieDetails/{id}")
    public ResponseEntity<String> deleteMovie(@PathVariable int id) {
        return ResponseEntity.ok(moviesService.deleteMovie(id));
    }

    @GetMapping("/getMovieById/{id}")
    public ResponseEntity<MoviesEntity> getMovieById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(moviesService.getMovieById(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/searchMovies")
    public ResponseEntity<List<MoviesEntity>> searchMovies(
    @RequestParam(required = false) String title,
    @RequestParam(required = false) String genre,
    @RequestParam(required = false) Double priceMin,
    @RequestParam(required = false) Double priceMax,
    @RequestParam(required = false) Double ratingMin,
    @RequestParam(required = false) Double ratingMax
) {
    return ResponseEntity.ok(moviesService.searchMovies(title, genre, priceMin, priceMax, ratingMin, ratingMax));
}

}