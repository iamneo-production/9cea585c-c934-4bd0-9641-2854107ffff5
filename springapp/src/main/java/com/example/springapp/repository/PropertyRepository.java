package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.Property;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findAllByIdNotIn(List<Long> id);

    List<Property> findByAgentId(Long agentId);
}
