package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.UserFavourite;

@Repository
public interface UserFavouriteRepository extends JpaRepository<UserFavourite, Long> {
    List<UserFavourite> findByUserId(Long userId);
}