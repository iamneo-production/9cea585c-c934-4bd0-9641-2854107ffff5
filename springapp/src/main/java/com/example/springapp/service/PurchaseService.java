package com.example.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Purchase;
import com.example.springapp.repository.PurchaseRepository;

@Service
public class PurchaseService {

    @Autowired
    PurchaseRepository purchaseRepository;

    public Purchase savePurchase(Purchase purchase) {
        return purchaseRepository.save(purchase);
    }

    public Purchase findById(Long Id) {
        return purchaseRepository.findById(Id).orElse(null);
    }

    public List<Purchase> getPurchaseHistoryByUserId(Long userId) {
        return purchaseRepository.findByUserId(userId);
    }

}