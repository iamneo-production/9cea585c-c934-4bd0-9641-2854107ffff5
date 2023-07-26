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

    public List<UserFavourite> getUserFavourites(Long userId) {
        try {
            return userFavouriteRepository.findByUserId(userId);
        } catch (Exception e) {
            // Handle exception
            throw new UserFavouriteException("Failed to get user favorites");
        }
    }

    public UserFavourite addUserFavourite(UserFavourite userFavourite) {
        try {
            return userFavouriteRepository.save(userFavourite);
        } catch (Exception e) {
            // Handle exception
            throw new UserFavouriteException("Failed to add user favorite");
        }
    }

    public void removeUserFavourite(Long favId) {
        try {
            userFavouriteRepository.deleteById(favId);
        } catch (Exception e) {
            // Handle exception
            throw new UserFavouriteException("Failed to remove user favorite");
        }
    }
}

class UserFavouriteException extends RuntimeException {
    public UserFavouriteException(String message) {
        super(message);
    }
}
