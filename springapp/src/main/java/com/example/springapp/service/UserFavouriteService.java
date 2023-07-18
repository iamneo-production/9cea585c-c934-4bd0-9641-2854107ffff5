package com.example.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.UserFavourite;
import com.example.springapp.repository.UserFavouriteRepository;

@Service
public class UserFavouriteService {

    @Autowired
    UserFavouriteRepository userFavouriteRepository;

    public List<userFavourite> getUserFavourites(Long userId) {
        try {
            return UserFavouriteRepository.findByUserId(userId);
        } catch (Exception e) {
            // Handle exception
            throw new RuntimeException("Failed to get user favorites");
        }
    }

    public UserFavourite addUserFavourite(UserFavourite userFavourite) {
        try {
            return UserFavouriteRepository.save(userFavourite);
        } catch (Exception e) {
            // Handle exception
            throw new RuntimeException("Failed to add user favorite");
        }
    }

    public void removeUserFavourite(Long favId) {
        try {
            UserFavouriteRepository.deleteById(favId);
        } catch (Exception e) {
            // Handle exception
            throw new RuntimeException("Failed to remove user favorite");
        }
    }
}