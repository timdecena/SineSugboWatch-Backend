package com.g2appdev.sinesugbowatch.service;

import java.util.List;
import java.util.NoSuchElementException;

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
    @SuppressWarnings("finally")
    public UserEntity putUserDetails(int id, UserEntity newUserDetails) {
        UserEntity user = new UserEntity();
        try {
            // Search for user by ID
            user = userRepo.findById(id).orElseThrow(() -> 
                new NameNotFoundException("User " + id + " not found")
            );

            // Update the fields with new values
            user.setUsername(newUserDetails.getUsername());
            user.setEmail(newUserDetails.getEmail());
            user.setPassword(newUserDetails.getPassword());

        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("User " + id + " not found");
        } finally {
            return userRepo.save(user);
        }
    }

    // Delete of CRUD
    public String deleteUser(int id) {
        String msg = "";
        if (userRepo.existsById(id)) {
            userRepo.deleteById(id);
            msg = "User record successfully deleted!";
        } else {
            msg = id + " Not Found!";
        }
        return msg;
    }
}

