package com.g2appdev.sinesugbowatch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.g2appdev.sinesugbowatch.entity.Transaction;
import com.g2appdev.sinesugbowatch.service.TransactionService;

@RestController
@RequestMapping(method = RequestMethod.GET, path = "/api/transaction")
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @GetMapping("/print")
    public String print() {
        return "Hello, Transaction Management!";
    }

    // Create operation of CRUD
    @PostMapping("/postTransactionRecord")
    public Transaction postTransactionRecord(@RequestBody Transaction transaction) {
        return transactionService.postTransactionRecord(transaction);
    }

    // Read operation of CRUD
    @GetMapping("/getAllTransactions")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    // Update operation of CRUD
    @PutMapping("/putTransactionDetails")
    public Transaction putTransactionDetails(@RequestParam int id, @RequestBody Transaction newTransactionDetails) {
        return transactionService.putTransactionDetails(id, newTransactionDetails);
    }

    // Delete operation of CRUD
    @DeleteMapping("/deleteTransactionDetails/{id}")
    public String deleteTransaction(@PathVariable int id) {
        return transactionService.deleteTransaction(id);
    }
}
