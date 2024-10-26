package com.g2appdev.sinesugbowatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.g2appdev.sinesugbowatch.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    public Admin findByUsername(String username);
    public Admin findByEmail(String email);
}
