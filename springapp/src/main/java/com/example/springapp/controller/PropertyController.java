package com.example.springapp.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.model.Agent;
import com.example.springapp.model.Property;
import com.example.springapp.repository.AgentRepository;
import com.example.springapp.service.PropertyService;

@RestController
@RequestMapping("/properties")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private AgentRepository agentRepository;

    @Value("${property.media.path}")
    private String mediaPath;

    @PostMapping
    public ResponseEntity<Property> registerProperty(
            @ModelAttribute Property property,
            @RequestParam("images") MultipartFile[] images,
            @RequestParam("videos") MultipartFile[] videos,
            @RequestParam("agentId") Long agentId) {

        // Retrieve agent from the database
        Agent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Agent not found with id: " + agentId));

        // Set the agent for the property
        property.setAgent(agent);

        // Set the image URLs
        List<String> imageUrls = saveMediaFiles(images);
        property.setImageUrls(imageUrls);

        // Set the video URLs
        List<String> videoUrls = saveMediaFiles(videos);
        property.setVideoUrls(videoUrls);

        Property createdProperty = propertyService.createProperty(property);

        if (createdProperty != null) {
            return new ResponseEntity<>(createdProperty, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyService.getAllProperties();
        if (!properties.isEmpty()) {
            return new ResponseEntity<>(properties, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<List<Property>> getProperties() {
        List<Property> properties = propertyService.getProperties();
        if (!properties.isEmpty()) {
            return new ResponseEntity<>(properties, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Property property = propertyService.getPropertyById(id);
        if (property != null) {
            return new ResponseEntity<>(property, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        Property property = propertyService.getPropertyById(id);
        if (property != null) {
            propertyService.deleteProperty(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    private List<String> saveMediaFiles(MultipartFile[] files) {
        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                String fileUrl = saveFile(file);
                fileUrls.add(fileUrl);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return fileUrls;
    }

    private String saveFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String filePath = mediaPath + fileName;
        File destinationFile = new File(filePath);
        file.transferTo(destinationFile);
        return fileName;
    }

    @PutMapping
    public ResponseEntity<Property> updateProperty(
            @RequestParam("id") Long id,
            @ModelAttribute Property property,
            @RequestParam(value = "images", required = false) MultipartFile[] images,
            @RequestParam(value = "videos", required = false) MultipartFile[] videos) {

        // Handle images and update URLs if provided
        List<String> newimageUrls = null;
        if (images != null && images.length > 0) {
            newimageUrls = saveMediaFiles(images);
        }

        // Handle videos and update URLs if provided
        List<String> newvideoUrls = null;
        if (videos != null && videos.length > 0) {
            newvideoUrls = saveMediaFiles(videos);
        }

        Property updatedProperty = propertyService.updateProperty(id, property, newimageUrls, newvideoUrls);
        if (updatedProperty != null) {
            return ResponseEntity.ok(updatedProperty);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
