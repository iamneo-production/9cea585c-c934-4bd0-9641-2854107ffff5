package com.example.springapp.controller;

import java.io.File;
import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.model.Agent;
import com.example.springapp.model.Property;
import com.example.springapp.service.AgentService;
import com.example.springapp.service.PropertyService;

@CrossOrigin(origins = "https://8081-dfafaaeeddfbcddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io", allowedHeaders = "*")
@RestController
@RequestMapping("/agents")
public class AgentController {

    @Autowired
    AgentService agentService;

    @Autowired
    PropertyService propertyService;

    // @Value("${profile.image.path}")
    private String imageUploadPath="reactapp/public/Assets/ProfileImage/";

    @PostMapping
    public ResponseEntity<Agent> registerAgent(
            @ModelAttribute Agent agent,
            @RequestParam("profileImage") MultipartFile profileImage) {

        // Check if the agent already exists
        if (agentService.isAgentExists(agent.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // Set the profile image file name
        String profileImageFileName = profileImage.getOriginalFilename();
        agent.setProfileImageUrl(profileImageFileName);

        Agent createdAgent = agentService.createAgent(agent);

        if (createdAgent != null) {
            // Save the profile image
            saveProfileImage(profileImage, profileImageFileName);
            return new ResponseEntity<>(createdAgent, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Agent>> getAllAgents() {
        List<Agent> agents = agentService.getAllAgents();
        if (!agents.isEmpty()) {
            return new ResponseEntity<>(agents, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/id")
    public ResponseEntity<Agent> getAgentById(@RequestParam("id") Long id) {
        Agent agent = agentService.getAgentById(id);
        if (agent != null) {
            return new ResponseEntity<>(agent, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Agent> loginAgent(@RequestBody Agent loginAgent) {
        Agent agent = agentService.login(loginAgent.getEmail(), loginAgent.getPassword());
        if (agent != null) {
            return new ResponseEntity<>(agent, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping
    public ResponseEntity<String> updateUser(
            @ModelAttribute Agent agentData,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {
        try {
            // Handle the profile image if it is provided
            if (profileImage != null) {
                // Set the profile image file name
                String profileImageFileName = profileImage.getOriginalFilename();
                agentData.setProfileImageUrl(profileImageFileName);
                // Save the profile image
                saveProfileImage(profileImage, profileImageFileName);
            }

            // Call the service method to update the user
            agentService.updateAgent(agentData);

            return ResponseEntity.ok("User updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAgent(@PathVariable("id") Long agentId) {
        boolean deleted = agentService.deleteAgent(agentId);
        if (deleted) {
            return new ResponseEntity<>("Agent deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Agent not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/properties/{userId}")
    public ResponseEntity<List<Property>> getUserProperties(@PathVariable("userId") Long userId) {
        List<Property> properties = propertyService.getPropertiesByUserId(userId);
        if (!properties.isEmpty()) {
            return ResponseEntity.ok(properties);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    private void saveProfileImage(MultipartFile profileImage, String profileImageFileName) {
        try {
            String imagePath = imageUploadPath + profileImageFileName;
            File destinationFile = new File(imagePath);
            profileImage.transferTo(destinationFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
