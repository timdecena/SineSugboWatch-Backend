package com.g2appdev.sinesugbowatch.service;

import java.util.List;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.sinesugbowatch.entity.Admin;
import com.g2appdev.sinesugbowatch.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepo;

    // Create of CRUD
    public Admin postAdminRecord(Admin admin) {
        return adminRepo.save(admin);
    }

    // Read of CRUD
    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    // Update of CRUD
    public Admin putAdminDetails(int id, Admin newAdminDetails) throws NameNotFoundException {
        Admin admin = adminRepo.findById(id).orElseThrow(() -> 
            new NameNotFoundException("Admin " + id + " not found")
        );

        // Update the fields with new values
        admin.setUsername(newAdminDetails.getUsername());
        admin.setEmail(newAdminDetails.getEmail());
        admin.setPassword(newAdminDetails.getPassword()); // Directly set the new password

        return adminRepo.save(admin);
    }

    // Delete of CRUD
    public String deleteAdmin(int id) {
        String msg;
        if (adminRepo.existsById(id)) {
            adminRepo.deleteById(id);
            msg = "Admin record successfully deleted!";
        } else {
            msg = id + " Not Found!";
        }
        return msg;
    }

    // Login method
    public Admin authenticate(String username, String password) throws NameNotFoundException {
        Admin admin = adminRepo.findByUsername(username);
        if (admin == null) {
            throw new NameNotFoundException("Admin " + username + " not found");
        }

        // Check if the password matches
        if (admin.getPassword().equals(password)) {
            return admin; // Return the admin entity if authentication is successful
        } else {
            throw new IllegalArgumentException("Invalid password");
        }
    }
}
