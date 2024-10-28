package com.g2appdev.sinesugbowatch.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g2appdev.sinesugbowatch.entity.Transaction;
import com.g2appdev.sinesugbowatch.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepo;

    // Create of CRUD
    public Transaction postTransactionRecord(Transaction transaction) {
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
