package com.example.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Agent;
import com.example.springapp.repository.AgentRepository;

@Service
public class AgentService {

    @Autowired
    AgentRepository agentRepository;

    public Agent createAgent(Agent agent) {
        return agentRepository.save(agent);
    }

    public boolean isAgentExists(String email) {
        return agentRepository.existsByEmail(email);
    }

    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    public Agent getAgentById(Long id) {
        Optional<Agent> agentOptional = agentRepository.findById(id);
        return agentOptional.orElse(null);
    }

    public Agent login(String email, String password) {
        Agent agent = agentRepository.findByEmail(email);
        if (agent != null && agent.getPassword().equals(password)) {
            return agent;
        } else {
            return null;
        }
    }

    public void updateAgent(Agent updatedAgentData) {
        // Retrieve the existing user data from the database
        Optional<Agent> existingAgentDataOptional = agentRepository.findById(updatedAgentData.getId());

        if (existingAgentDataOptional.isPresent()) {
            Agent existingAgentData = existingAgentDataOptional.get();

            // Update the fields that should be modified
            existingAgentData.setName(updatedAgentData.getName());
            existingAgentData.setPhone(updatedAgentData.getPhone());
            existingAgentData.setPassword(updatedAgentData.getPassword());
            existingAgentData.setAddress(updatedAgentData.getAddress());
            existingAgentData.setProfileImageUrl(updatedAgentData.getProfileImageUrl());

            // Save the updated user data back to the database
            agentRepository.save(existingAgentData);
        } else {
            throw new IllegalArgumentException("User not found."); // Or handle the case when the user doesn't exist
        }
    }

    public boolean deleteAgent(Long agentId) {
        if (agentRepository.existsById(agentId)) {
            agentRepository.deleteById(agentId);
            return true;
        }
        return false;
    }
}