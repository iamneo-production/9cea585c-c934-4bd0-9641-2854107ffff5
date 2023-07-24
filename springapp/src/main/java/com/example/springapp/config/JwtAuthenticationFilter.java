package com.example.springapp.config;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.springapp.model.Agent;
import com.example.springapp.model.User;
import com.example.springapp.repository.AgentRepository;
import com.example.springapp.repository.UserRepository;

import io.jsonwebtoken.Claims;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AgentRepository agentRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwtToken = authorizationHeader.substring(7);
            if (jwtUtil.isValidToken(jwtToken)) {
                // Token is valid, set up authentication context
                Claims claims = jwtUtil.extractAllClaims(jwtToken);
                String role = claims.get("role", String.class);

                if (role != null) {
                    switch (role) {
                        case "buyer":
                            authenticateAsBuyer(claims);
                            break;
                        case "seller":
                        case "admin":
                            authenticateAsAgent(claims);
                            break;
                        default:
                            // Handle any other role if necessary
                            break;
                    }
                }
            }
        }
        chain.doFilter(request, response);
    }

    private void authenticateAsBuyer(Claims claims) {
        Long buyerId = claims.get("id", Long.class);
        Optional<User> buyerOptional = userRepository.findById(buyerId);
        buyerOptional.ifPresent(buyer -> {
            GrantedAuthority buyerAuthority = new SimpleGrantedAuthority("ROLE_BUYER");
            Authentication authentication = new UsernamePasswordAuthenticationToken(buyer, null,
                    Collections.singleton(buyerAuthority));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        });
    }

    private void authenticateAsAgent(Claims claims) {
        Long agentId = claims.get("id", Long.class);
        Optional<Agent> agentOptional = agentRepository.findById(agentId);
        agentOptional.ifPresent(agent -> {
            String role = claims.get("role", String.class);
            GrantedAuthority agentAuthority = new SimpleGrantedAuthority("ROLE_" + role.toUpperCase());
            Authentication authentication = new UsernamePasswordAuthenticationToken(agent, null,
                    Collections.singleton(agentAuthority));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        });
    }
}