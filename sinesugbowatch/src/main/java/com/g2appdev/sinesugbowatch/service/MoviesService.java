package com.g2appdev.sinesugbowatch.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.sinesugbowatch.entity.Admin;
import com.g2appdev.sinesugbowatch.entity.MoviesEntity;
import com.g2appdev.sinesugbowatch.repository.AdminRepository;
import com.g2appdev.sinesugbowatch.repository.MoviesRepository;

import jakarta.transaction.Transactional;

@Service
public class MoviesService {

    @Autowired
    private MoviesRepository moviesRepo;
    
    @Autowired
    private AdminRepository adminRepo;

    // Create operation of CRUD
    public MoviesEntity postMovieRecord(MoviesEntity movie) {
        Admin admin = adminRepo.findById(movie.getAdmin().getAdminId())
                .orElseThrow(() -> new NoSuchElementException("Admin with ID " + movie.getAdmin().getAdminId() + " does not exist."));
        
        movie.setAdmin(admin);
        return moviesRepo.save(movie);
    }

    // Read operation of CRUD
    public List<MoviesEntity> getAllMovies() {
        return moviesRepo.findAll();
    }

    // Update operation of CRUD
    public MoviesEntity putMovieDetails(int id, MoviesEntity newMovieDetails) {
        MoviesEntity movie = moviesRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Movie with ID " + id + " not found."));
        
        movie.setTitle(newMovieDetails.getTitle());
        movie.setGenre(newMovieDetails.getGenre());
        movie.setDescription(newMovieDetails.getDescription());
        movie.setPrice(newMovieDetails.getPrice());
        movie.setRating(newMovieDetails.getRating());
        
        return moviesRepo.save(movie);
    }

    // Delete operation of CRUD
    @Transactional
    public String deleteMovie(int id) {
        if (moviesRepo.existsById(id)) {
            moviesRepo.deleteById(id);
            return "Movie record successfully deleted!";
        } else {
            return "Movie with ID " + id + " not found!";
        }
    }

    public MoviesEntity getMovieById(int id) {
        return moviesRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Movie with ID " + id + " not found."));
    }

    public List<MoviesEntity> searchMovies(String title, String genre, Double priceMin, Double priceMax, Double ratingMin, Double ratingMax) {
    return moviesRepo.findAll().stream().filter(movie -> {
        return (title == null || movie.getTitle().toLowerCase().contains(title.toLowerCase())) &&
               (genre == null || movie.getGenre().toLowerCase().contains(genre.toLowerCase())) &&
               (priceMin == null || movie.getPrice() >= priceMin) &&
               (priceMax == null || movie.getPrice() <= priceMax) &&
               (ratingMin == null || movie.getRating() >= ratingMin) &&
               (ratingMax == null || movie.getRating() <= ratingMax);
    }).collect(Collectors.toList());
}

}