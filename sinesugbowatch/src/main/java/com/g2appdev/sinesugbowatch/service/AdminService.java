package com.g2appdev.sinesugbowatch.service;

import com.g2appdev.sinesugbowatch.entity.Admin;
import com.g2appdev.sinesugbowatch.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import javax.naming.NameNotFoundException;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepo;
    
    public AdminService(){
    	super();
    }
    
    // Create
    public Admin addAdmin(Admin admin) {
        return adminRepo.save(admin);
    }

    // Read
    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    // Update
    @SuppressWarnings("finally")
	public Admin updateAdmin(int id, Admin newAdminDetails) {
    	Admin admin = new Admin();
    	try {
    		admin = adminRepo.findById(id).get();
    		admin.setUsername(newAdminDetails.getUsername());
    		admin.setEmail(newAdminDetails.getEmail());
    		admin.setPassword(newAdminDetails.getPassword());}
    		catch (NoSuchElementException nex){
    			throw new NameNotFoundException ("Record not found");
    			}
    			finally{
    			return adminRepo.save(admin);
    			}
  
    }

    // Delete
    public String deleteAdmin(int id) {
        if (adminRepo.existsById(id)) {
            adminRepo.deleteById(id);
            return "Admin record successfully deleted!";
        } else {
            return "Admin with ID " + id + " not found!";
        }
    }
}
