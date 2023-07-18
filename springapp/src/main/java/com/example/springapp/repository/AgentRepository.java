package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.Agent;

@Repository
public interface AgentRepository extends JpaRepository<Agent, Long> {
    Agent findByEmail(String email);

    boolean existsByEmail(String email);
}
