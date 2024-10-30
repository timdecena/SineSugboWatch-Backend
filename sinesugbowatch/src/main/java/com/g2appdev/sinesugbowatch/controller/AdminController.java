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

import com.g2appdev.sinesugbowatch.entity.Admin;
import com.g2appdev.sinesugbowatch.service.AdminService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/print")
    public String print() {
        return "Hello, Admin Management!";
    }

    // Create operation of CRUD
    @PostMapping("/postAdminRecord")
    public Admin postAdminRecord(@RequestBody Admin admin) {
        return adminService.postAdminRecord(admin);
    }

    // Read operation of CRUD
    @GetMapping("/getAllAdmins")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

    // Update operation of CRUD
    @PutMapping("/putAdminDetails/{id}")
    public Admin putAdminDetails(@PathVariable int id, @RequestBody Admin newAdminDetails) throws NameNotFoundException {
        return adminService.putAdminDetails(id, newAdminDetails);
    }

    // Delete operation of CRUD
    @DeleteMapping("/deleteAdminDetails/{id}")
    public String deleteAdmin(@PathVariable int id) {
        return adminService.deleteAdmin(id);
    }

    // Login operation
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin admin) {
        try {
            Admin authenticatedAdmin = adminService.authenticate(admin.getUsername(), admin.getPassword());
            return ResponseEntity.ok(authenticatedAdmin); // Return admin data upon successful login
        } catch (NameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
