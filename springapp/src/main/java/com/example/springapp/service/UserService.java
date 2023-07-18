package com.example.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public boolean isUserExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        } else {
            return null;
        }
    }

    public User getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    public void updateUser(User updatedUserData) {
        // Retrieve the existing user data from the database
        Optional<User> existingUserDataOptional = userRepository.findById(updatedUserData.getId());

        if (existingUserDataOptional.isPresent()) {
            User existingUserData = existingUserDataOptional.get();

            // Update the fields that should be modified
            existingUserData.setName(updatedUserData.getName());
            existingUserData.setPhone(updatedUserData.getPhone());
            existingUserData.setPassword(updatedUserData.getPassword());
            existingUserData.setAddress(updatedUserData.getAddress());

            // Save the updated user data back to the database
            userRepository.save(existingUserData);
        } else {
            throw new IllegalArgumentException("User not found."); // Or handle the case when the user doesn't exist
        }
    }

    public boolean deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
