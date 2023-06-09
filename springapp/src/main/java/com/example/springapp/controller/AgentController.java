package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.model.Agent;
import com.example.springapp.service.AgentService;

import java.io.File;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping("/agents")
public class AgentController {

    @Autowired
    AgentService agentService;

    @Value("${profile.image.path}")
    private String imageUploadPath;

    @PostMapping
    public ResponseEntity<Agent> registerAgent(
            @ModelAttribute Agent agent,
            @RequestParam("profileImage") MultipartFile profileImage) {

        // Set the profile image file name
        String profileImageFileName = imageUploadPath + profileImage.getOriginalFilename();
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

    private void saveProfileImage(MultipartFile profileImage, String profileImageFileName) {
        try {
            String imagePath = imageUploadPath + profileImageFileName;
            File destinationFile = new File(imagePath);
            profileImage.transferTo(destinationFile);
        } catch (IOException e) {
            e.printStackTrace();
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
}