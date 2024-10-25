package com.g2appdev.sinesugbowatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g2appdev.sinesugbowatch.entity.UserEntity;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    // Method to find UserEntity by username
    public UserEntity findByUsername(String username);
}