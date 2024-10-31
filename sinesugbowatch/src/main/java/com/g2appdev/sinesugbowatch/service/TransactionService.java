package com.g2appdev.sinesugbowatch.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.sinesugbowatch.entity.MoviesEntity;
import com.g2appdev.sinesugbowatch.entity.Transaction;
import com.g2appdev.sinesugbowatch.entity.UserEntity;
import com.g2appdev.sinesugbowatch.repository.MoviesRepository;
import com.g2appdev.sinesugbowatch.repository.TransactionRepository;
import com.g2appdev.sinesugbowatch.repository.UserRepository;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepo;
    
    @Autowired
    UserRepository userRepo;
    
    @Autowired
    MoviesRepository movieRepo;

    // Create of CRUD
    public Transaction postTransactionRecord(Transaction transaction) {
        // Retrieve user and movie entities based on their IDs
        UserEntity user = userRepo.findById(transaction.getUser().getUser_id())
                .orElseThrow(() -> new NoSuchElementException("User with ID " + transaction.getUser().getUser_id() + " does not exist."));
        MoviesEntity movie = movieRepo.findById(transaction.getMovies().getMovie_id())
                .orElseThrow(() -> new NoSuchElementException("Movie with ID " + transaction.getMovies().getMovie_id() + " does not exist."));
        
        // Set the retrieved user and movie entities
        transaction.setUser(user);
        transaction.setMovies(movie);
        
        // Save and return the transaction record
        return transactionRepo.save(transaction);
    }


    // Read of CRUD
    public List<Transaction> getAllTransactions() {
        return transactionRepo.findAll();
    }

    // Update of CRUD
    @SuppressWarnings("finally")
    public Transaction putTransactionDetails(int id, Transaction newTransactionDetails) {
        Transaction transaction = new Transaction();
        try {
            // Search for transaction by ID
            transaction = transactionRepo.findById(id).orElseThrow(() -> 
                new NameNotFoundException("Transaction " + id + " not found")
            );

            // Update the fields with new values
            transaction.setPaymentmethod(newTransactionDetails.getPaymentmethod());

        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Transaction " + id + " not found");
        } finally {
            return transactionRepo.save(transaction);
        }
    }

    // Delete of CRUD
    public String deleteTransaction(int id) {
        String msg = "";
        if (transactionRepo.existsById(id)) {
            transactionRepo.deleteById(id);
            msg = "Transaction record successfully deleted!";
        } else {
            msg = id + " Not Found!";
        }
        return msg;
    }
}
