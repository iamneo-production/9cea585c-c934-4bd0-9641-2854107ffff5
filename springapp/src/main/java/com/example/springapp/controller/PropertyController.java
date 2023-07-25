package com.example.springapp.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;

@RestController
@RequestMapping("/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private AgentRepository agentRepository;

    private final Cloudinary cloudinary;

    public PropertyController() {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dojkaeq7z",
                "api_key", "627827944452969",
                "api_secret", "2hT5-Cn73z8CxDcWbr1EN1LgK2s"));
    }


    @PostMapping
    public ResponseEntity<Property> registerProperty(
            @ModelAttribute Property property,
            @RequestParam("images") MultipartFile[] images,
            @RequestParam("videos") MultipartFile[] videos,
            @RequestParam("agentId") Long agentId) {

        try {
            Agent agent = agentRepository.findById(agentId)
                    .orElseThrow(() -> new RuntimeException("Agent not found with id: " + agentId));

            property.setAgent(agent);

            List<String> imageUrls = saveMediaFiles(images);
            property.setImageUrls(imageUrls);

            List<String> videoUrls = saveMediaFiles(videos);
            property.setVideoUrls(videoUrls);

            Property createdProperty = propertyService.createProperty(property);

            if (createdProperty != null) {
                return new ResponseEntity<>(createdProperty, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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

    @PutMapping
    public ResponseEntity<Property> updateProperty(
            @RequestParam("id") Long id,
            @ModelAttribute Property property,
            @RequestParam(value = "images", required = false) MultipartFile[] images,
            @RequestParam(value = "videos", required = false) MultipartFile[] videos) {

        try {
            List<String> newimageUrls = null;
            if (images != null && images.length > 0) {
                newimageUrls = saveMediaFiles(images);
            }

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
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    private List<String> saveMediaFiles(MultipartFile[] files) throws IOException {
        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            String fileUrl = saveFile(file);
            fileUrls.add(fileUrl);
        }
        return fileUrls;
    }

    private String saveFile(MultipartFile file) throws IOException {
        return saveMediaFile(file);
    }

    public String saveMediaFile(MultipartFile file) throws IOException {
        // Check if the file is null or has a valid content type
        if (file == null || file.getContentType() == null) {
            // Handle the case where the file is null or the content type is missing
            throw new IllegalArgumentException("Invalid file or missing content type.");
        }

        // Get the original filename
        String originalFilename = file.getOriginalFilename();

        // Check if the file is an image or a video
        String contentType = file.getContentType();
        boolean isImage = contentType != null && contentType.startsWith("image");

        // Upload the file to Cloudinary with the appropriate resource type
        String mediaUrl;
        if (isImage) {
            mediaUrl = cloudinary.uploader()
                    .upload(file.getBytes(), ObjectUtils.asMap("public_id", originalFilename))
                    .get("url").toString();
        } else {
            mediaUrl = cloudinary.uploader()
                    .upload(file.getBytes(), ObjectUtils.asMap("resource_type", "video", "public_id", originalFilename))
                    .get("url").toString();
        }

        // Return the public URL of the uploaded file
        return mediaUrl;
    }

}
