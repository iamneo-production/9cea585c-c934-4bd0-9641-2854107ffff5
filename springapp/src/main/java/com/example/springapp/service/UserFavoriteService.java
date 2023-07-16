package com.example.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.UserFavorite;
import com.example.springapp.repository.UserFavoriteRepository;

@Service
public class UserFavoriteService {

    @Autowired
    UserFavoriteRepository userFavoriteRepository;

    public List<UserFavorite> getUserFavorites(Long userId) {
        try {
            return userFavoriteRepository.findByUserId(userId);
        } catch (Exception e) {
            // Handle exception
            throw new RuntimeException("Failed to get user favorites");
        }
    }

    public UserFavorite addUserFavorite(UserFavorite userFavorite) {
        try {
            return userFavoriteRepository.save(userFavorite);
        } catch (Exception e) {
            // Handle exception
            throw new RuntimeException("Failed to add user favorite");
        }
    }

    public void removeUserFavorite(Long favId) {
        try {
            userFavoriteRepository.deleteById(favId);
        } catch (Exception e) {
            // Handle exception
            throw new RuntimeException("Failed to remove user favorite");
        }
    }
}