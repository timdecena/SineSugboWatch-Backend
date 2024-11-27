package com.g2appdev.sinesugbowatch.service;

import java.util.List;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.sinesugbowatch.entity.UserEntity;
import com.g2appdev.sinesugbowatch.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    // Create of CRUD
    public UserEntity postUserRecord(UserEntity user) {
        return userRepo.save(user);
    }

    // Read of CRUD
    public List<UserEntity> getAllUsers() {
        return userRepo.findAll();
    }

    // Update of CRUD
    public UserEntity putUserDetails(int id, UserEntity newUserDetails) throws NameNotFoundException {
        UserEntity user = userRepo.findById(id).orElseThrow(() -> 
            new NameNotFoundException("User " + id + " not found")
        );

        // Update the fields with new values
        user.setUsername(newUserDetails.getUsername());
        user.setEmail(newUserDetails.getEmail());
        user.setPassword(newUserDetails.getPassword()); // Directly set the new password

        return userRepo.save(user);
    }

    // Delete of CRUD
    public String deleteUser(int id) {
        String msg;
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
            msg = "User record successfully deleted!";
        } else {
            msg = id + " Not Found!";
        }
        return msg;
    }

    // Login method
    public UserEntity authenticate(String username, String password) throws NameNotFoundException {
        UserEntity user = userRepo.findByUsername(username);
        if (user == null) {
            throw new NameNotFoundException("User " + username + " not found");
        }

        // Check if the password matches
        if (user.getPassword().equals(password)) {
            return user; // Return the user entity if authentication is successful
        } else {
            throw new IllegalArgumentException("Invalid password");
        }
    }

    public boolean isUsernameTaken(String username) {
        return userRepo.findByUsername(username) != null;
    }

    public boolean isEmailTaken(String email) {
        return userRepo.findByEmail(email) != null;
    }
}
