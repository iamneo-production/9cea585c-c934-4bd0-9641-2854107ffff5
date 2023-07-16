package com.example.springapp.service;

import com.example.springapp.model.Query;
import com.example.springapp.repository.QueryRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QueryService {

    @Autowired
    QueryRepository queryRepository;

    public Query saveQuery(Query query) {
        return queryRepository.save(query);
    }

    public List<Query> getUserQueries(Long userId, String userRole) {
        return queryRepository.findByUserIdAndUserRole(userId, userRole);
    }

    public boolean addReplyToQuery(Long queryId, String reply) {
        Optional<Query> optionalQuery = queryRepository.findById(queryId);
        if (optionalQuery.isPresent()) {
            Query query = optionalQuery.get();
            query.getReplies().add(reply);
            queryRepository.save(query);
            return true;
        }
        return false;
    }

    public List<Query> getAllQueries() {
        return queryRepository.findAll();
    }
}