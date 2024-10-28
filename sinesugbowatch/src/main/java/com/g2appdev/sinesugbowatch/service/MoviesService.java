package com.g2appdev.sinesugbowatch.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.sinesugbowatch.entity.MoviesEntity;
import com.g2appdev.sinesugbowatch.repository.MoviesRepository;

@Service
public class MoviesService {

    @Autowired
    MoviesRepository moviesRepo;

    // Create of CRUD
    public MoviesEntity postMovieRecord(MoviesEntity movie) {
        return moviesRepo.save(movie);
    }

    // Read of CRUD
    public List<MoviesEntity> getAllMovies() {
        return moviesRepo.findAll();
    }

    // Update of CRUD
    @SuppressWarnings("finally")
    public MoviesEntity putMovieDetails(int id, MoviesEntity newMovieDetails) {
        MoviesEntity movie = new MoviesEntity();
        try {
            // Search for movie by ID
            movie = moviesRepo.findById(id).orElseThrow(() -> 
                new NameNotFoundException("Movie " + id + " not found")
            );

            // Update the fields with new values
            movie.setTitle(newMovieDetails.getTitle());
            movie.setGenre(newMovieDetails.getGenre());
            movie.setDescription(newMovieDetails.getDescription());
            movie.setRating(newMovieDetails.getRating());

        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Movie " + id + " not found");
        } finally {
            return moviesRepo.save(movie);
        }
    }

    // Delete of CRUD
    public String deleteMovie(int id) {
        String msg = "";
        if (moviesRepo.existsById(id)) {
            moviesRepo.deleteById(id);
            msg = "Movie record successfully deleted!";
        } else {
            msg = id + " Not Found!";
        }
        return msg;
    }
}
