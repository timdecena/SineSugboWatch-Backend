package com.g2appdev.sinesugbowatch.controller;

import com.g2appdev.sinesugbowatch.entity.Admin;
import com.g2appdev.sinesugbowatch.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(method = RequestMethod.GET, path="/api/admin")
public class AdminController {
	
    @Autowired
    private AdminService adminService;

    @GetMapping("/printAdmins")
    public String print() {
        return "Printing all Admins...";
    }

    @PostMapping("/postAdminRecord")
    public Admin postAdminRecord(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }
    
    @GetMapping("/getAllAdmins")
    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }
    
    //UPDATE CRUD
    @PutMapping("/putAdminDetails")
    public Admin putAdminDetails(@RequestParam int id, @RequestBody Admin newAdminDetails) {
        return adminService.updateAdmin(id, newAdminDetails);
    }

    //DELETE CRUD
    @DeleteMapping("/deleteAdminDetails/{id}")
    public String deleteAdmin(@PathVariable int id) {
        return adminService.deleteAdmin(id);
    }
}
