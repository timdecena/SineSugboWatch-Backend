package com.g2appdev.sinesugbowatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g2appdev.sinesugbowatch.entity.Search;

@Repository
public interface SearchRepository extends JpaRepository<Search, Integer> {
    // Method to find Search by search query
    Search findBySearchquery(String searchquery);
}
