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

import com.example.springapp.model.UserFavourite;
import com.example.springapp.service.UserFavouriteService;

@RestController
@RequestMapping("/favourites")
@CrossOrigin(origins = "https://8081-dfafaaeeddfbcddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io", allowedHeaders = "*")
public class UserFavouriteController {

    @Autowired
    UserFavouriteService userFavouriteService;

    @GetMapping("/user")
    public ResponseEntity<List<UserFavourite>> getUserFavourites(@RequestParam Long userId) {
        try {
            List<UserFavourite> userFavourites = userFavouriteService.getUserFavourites(userId);
            return ResponseEntity.ok(userFavourites);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<UserFavourite> addUserFavourite(@RequestBody UserFavourite userFavourite) {
        try {
            UserFavourite addedFavorite = userFavouriteService.addUserFavourite(userFavourite);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedFavorite);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> removeUserFavourite(@RequestParam Long favId) {
        try {
            userFavouriteService.removeUserFavourite(favId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}