package com.example.springapp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.springapp.repository.AgentRepository;
import com.example.springapp.repository.PropertyRepository;
import com.example.springapp.repository.QueryRepository;
import com.example.springapp.repository.UserRepository;

@RestController
@RequestMapping("/Utility")
<<<<<<< HEAD
@CrossOrigin(origins = "https://8081-facbdebeebddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io", allowedHeaders = "*") 
=======
@CrossOrigin(origins = "https://8081-feaaeedcbbebeeddcfcdcebdafbcfcbaedbffbeeaadbbb.project.examly.io", allowedHeaders = "*") 
>>>>>>> fcfdb41471e66f70182516a0c73f1b5bac961644
public class UtilityController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AgentRepository agentRepository;

    @Autowired
    PropertyRepository propertyRepository;

    @Autowired
    QueryRepository queryRepository;

    @GetMapping("/data")
    public List<Long> fetchData() {
        List<Long> counts = new ArrayList<>();

        long userCount = userRepository.count();
        long agentCount = agentRepository.count();
        long propertyCount = propertyRepository.count();
        long queryCount = queryRepository.count();

        counts.add(userCount);
        counts.add(agentCount);
        counts.add(propertyCount);
        counts.add(queryCount);

        return counts;
    }
}
