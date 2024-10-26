package com.g2appdev.sinesugbowatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g2appdev.sinesugbowatch.entity.WatchlistEntity;

@Repository
public interface WatchlistRepository extends JpaRepository<WatchlistEntity, Integer> {
    WatchlistEntity findByListname(String listname);
}
