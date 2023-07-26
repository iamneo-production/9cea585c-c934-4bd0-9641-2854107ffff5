package com.example.springapp.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.springapp.model.Agent;
import com.example.springapp.model.Property;
import com.example.springapp.model.Purchase;
import com.example.springapp.model.User;
import com.example.springapp.repository.AgentRepository;
import com.example.springapp.repository.PropertyRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.PurchaseService;

@RestController
@RequestMapping("/purchase")
@CrossOrigin(origins = "https://8081-aacbbdbdbffeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io", allowedHeaders = "*") 
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AgentRepository agentRepository;

    @PostMapping("/order")
    public ResponseEntity<Purchase> createPurchaseOrder(
            @RequestParam("propertyId") Long propertyId,
            @RequestParam("userId") Long userId,
            @RequestParam("agentId") Long agentId,
            @RequestParam("payableAmount") Double payableAmount,
            @RequestParam("platformFee") Double platformFee,
            @ModelAttribute Purchase purchase) {

        // Retrieve the property, user, and agent based on the provided IDs
        Property property = propertyRepository.findById(propertyId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        Agent agent = agentRepository.findById(agentId).orElse(null);

        if (property != null && user != null && agent != null) {
            purchase.setProperty(property);
            purchase.setUser(user);
            purchase.setAgent(agent);
            purchase.setPayableAmount(payableAmount);
            purchase.setPlatformFee(platformFee);
            purchase.setOrderID("OD" + agentId + userId + propertyId);
            purchase.setStatus("Initiated");
            // Set the current time to the createdAt field
            purchase.setCreatedAt(LocalDateTime.now());
            Purchase order = purchaseService.savePurchase(purchase);

            return new ResponseEntity<>(order, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/order/{id}")
    public ResponseEntity<?> updateOrderWithPaymentId(@PathVariable("id") Long id,
            @RequestParam("paymentId") String paymentId) {
        try {
            Purchase purchase = purchaseService.findById(id);
            if (purchase == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
            }

            purchase.setRazorpayPaymentId(paymentId);
            purchase.setStatus("Success");

            Purchase updatedPurchase = purchaseService.savePurchase(purchase);

            return ResponseEntity.ok(updatedPurchase);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating order");
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<Purchase>> getPurchaseHistoryByUserId(@RequestParam("userId") Long userId) {
        List<Purchase> purchaseHistory = purchaseService.getPurchaseHistoryByUserId(userId);
        if (purchaseHistory.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(purchaseHistory);
        }
    }

}
