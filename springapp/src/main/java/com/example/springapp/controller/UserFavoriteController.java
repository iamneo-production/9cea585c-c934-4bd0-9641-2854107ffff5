package com.example.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.UserFavorite;
import com.example.springapp.service.UserFavoriteService;

@RestController
@RequestMapping("/favorites")
@CrossOrigin(origins = "https://8081-dfafaaeeddfbcddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io", allowedHeaders = "*")
public class UserFavoriteController {

    @Autowired
    UserFavoriteService userFavoriteService;

    @GetMapping("/user")
    public ResponseEntity<List<UserFavorite>> getUserFavorites(@RequestParam Long userId) {
        try {
            List<UserFavorite> userFavorites = userFavoriteService.getUserFavorites(userId);
            return ResponseEntity.ok(userFavorites);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<UserFavorite> addUserFavorite(@RequestBody UserFavorite userFavorite) {
        try {
            UserFavorite addedFavorite = userFavoriteService.addUserFavorite(userFavorite);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedFavorite);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> removeUserFavorite(@RequestParam Long favId) {
        try {
            userFavoriteService.removeUserFavorite(favId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}