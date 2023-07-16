package com.example.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.Query;
import com.example.springapp.service.QueryService;

@RestController
@RequestMapping("/Query")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class QueryController {

    @Autowired
    QueryService queryService;

    @PostMapping
    public ResponseEntity<String> createQuery(@RequestBody Query query) {
        Query savedQuery = queryService.saveQuery(query);
        if (savedQuery != null) {
            return new ResponseEntity<>("Query created successfully", HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Failed to create query", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/{queryId}")
    public ResponseEntity<String> postReply(@PathVariable Long queryId, @RequestBody String reply) {
        boolean success = queryService.addReplyToQuery(queryId, reply);
        if (success) {
            return new ResponseEntity<>("Reply posted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to post reply", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

   
}