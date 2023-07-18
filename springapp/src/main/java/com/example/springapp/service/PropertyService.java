package com.example.springapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Property;
import com.example.springapp.repository.PropertyRepository;
import com.example.springapp.repository.PurchaseRepository;

@Service
public class PropertyService {

    @Autowired
    PropertyRepository propertyRepository;

    @Autowired
    PurchaseRepository purchaseRepository;

    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    public List<Property> getAllProperties() {
        List<Long> purchasedPropertyIds = purchaseRepository.findAll()
                .stream()
                .map(purchase -> purchase.getProperty().getId())
                .collect(Collectors.toList());

        if (purchasedPropertyIds == null || purchasedPropertyIds.isEmpty()) {
            return propertyRepository.findAll();
        }

        return propertyRepository.findAllByIdNotIn(purchasedPropertyIds);
    }

    public List<Property> getProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id).orElse(null);
    }

    public List<Property> getPropertiesByUserId(Long userId) {
        return propertyRepository.findByAgentId(userId);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }

    public Property updateProperty(Long id, Property updatedProperty, List<String> newimageUrls,
            List<String> newvideoUrls) {
        Property existingProperty = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + id));

        // Update the property fields
        existingProperty.setTitle(updatedProperty.getTitle());
        existingProperty.setPrice(updatedProperty.getPrice());
        existingProperty.setDescription(updatedProperty.getDescription());
        existingProperty.setAddress(updatedProperty.getAddress());
        existingProperty.setStatus(updatedProperty.getStatus());
        existingProperty.setType(updatedProperty.getType());
        existingProperty.setFeatures(updatedProperty.getFeatures());

        // Update the image URLs if provided
        if (newimageUrls != null) {
            existingProperty.setImageUrls(newimageUrls);
            if (updatedProperty.getImageUrls() != null) {
                existingProperty.getImageUrls().addAll(updatedProperty.getImageUrls());
            }
        } else {
            if (updatedProperty.getImageUrls() != null) {
                existingProperty.setImageUrls(updatedProperty.getImageUrls());
            }
        }

        // Update the video URLs if provided
        if (newvideoUrls != null) {
            existingProperty.setVideoUrls(newvideoUrls);
            if (updatedProperty.getVideoUrls() != null) {
                existingProperty.getVideoUrls().addAll(updatedProperty.getVideoUrls());
            }
        } else {
            if (updatedProperty.getVideoUrls() != null) {
                existingProperty.setVideoUrls(updatedProperty.getVideoUrls());
            }
        }

        return propertyRepository.save(existingProperty);
    }
}
