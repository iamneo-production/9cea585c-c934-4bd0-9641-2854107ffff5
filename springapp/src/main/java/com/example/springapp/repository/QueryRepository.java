package com.example.springapp.repository;

import com.example.springapp.model.Query;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueryRepository extends JpaRepository<Query, Long> {
    List<Query> findByUserIdAndUserRole(Long userId, String userRole);

}