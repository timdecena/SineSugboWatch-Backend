package com.g2appdev.sinesugbowatch.controller;

import java.util.List;

import javax.naming.NameNotFoundException;

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
import org.springframework.web.bind.annotation.RestController;

import com.g2appdev.sinesugbowatch.entity.UserEntity;
import com.g2appdev.sinesugbowatch.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/print")
    public String print() {
        return "Hello, User Management!";
    }

    // Create operation of CRUD
    @PostMapping("/postUserRecord")
    public UserEntity postUserRecord(@RequestBody UserEntity user) {
        return userService.postUserRecord(user);
    }

    // Read operation of CRUD
    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    // Update operation of CRUD
    @PutMapping("/putUserDetails")
    public UserEntity putUserDetails(@PathVariable int id, @RequestBody UserEntity newUserDetails) throws NameNotFoundException {
        return userService.putUserDetails(id, newUserDetails);
    }

    // Delete operation of CRUD
    @DeleteMapping("/deleteUserDetails/{id}")
    public String deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
    }

    // Login operation
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserEntity user) {
        try {
            UserEntity authenticatedUser = userService.authenticate(user.getUsername(), user.getPassword());
            return ResponseEntity.ok(authenticatedUser); // Return user data upon successful login
        } catch (NameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
