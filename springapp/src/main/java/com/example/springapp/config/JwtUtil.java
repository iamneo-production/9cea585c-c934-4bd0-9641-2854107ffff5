// package com.example.springapp.config;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;

// import javax.annotation.PostConstruct;
// import javax.crypto.SecretKey;
// import java.util.Date;

// @Component
// public class JwtUtil {

//     private SecretKey secretKey;
//     private long expiration = 3600000;

//     @Value("${jwt.secret}")
//     private String secretKeyString;

//     @PostConstruct
//     public void init() {
//         secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes());
//     }

//     public String generateToken(long id, String role) {
//         Date now = new Date();
//         Date expiryDate = new Date(now.getTime() + expiration);

//         return Jwts.builder()
//                 .claim("id", id)
//                 .claim("role", role)
//                 .setIssuedAt(now)
//                 .setExpiration(expiryDate)
//                 .signWith(secretKey)
//                 .compact();
//     }

//     public boolean isValidToken(String token) {
//         try {
//             Jwts.parserBuilder()
//                     .setSigningKey(secretKey)
//                     .build()
//                     .parseClaimsJws(token);
//             return true;
//         } catch (Exception e) {
//             return false;
//         }
//     }

//     public Claims extractAllClaims(String token) {
//         return Jwts.parserBuilder()
//                 .setSigningKey(secretKey)
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody();
//     }
// }
