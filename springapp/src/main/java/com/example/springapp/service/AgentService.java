package com.example.springapp.service;

import com.example.springapp.model.Agent;
import com.example.springapp.repository.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgentService {

    @Autowired
    AgentRepository agentRepository;

    public Agent createAgent(Agent agent) {
        return agentRepository.save(agent);
    }

    public Agent login(String email, String password) {
        Agent agent = agentRepository.findByEmail(email);
        if (agent != null && agent.getPassword().equals(password)) {
            return agent;
        } else {
            return null;
        }
    }

    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    public Agent getAgentById(Long id) {
        Optional<Agent> agentOptional = agentRepository.findById(id);
        return agentOptional.orElse(null);
    }
}
