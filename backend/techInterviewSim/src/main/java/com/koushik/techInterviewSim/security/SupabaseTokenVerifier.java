package com.koushik.techInterviewSim.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.interfaces.RSAPublicKey; // Assuming RSA, adjust if needed
import java.util.Date;

@Slf4j
@Component
public class SupabaseTokenVerifier {

    @Value("${supabase.jwt.secret}")
    private String jwtSecret;

    @Value("${supabase.project-url}")
    private String supabaseProjectUrl;

    public DecodedJWT verifyToken(String token) {
        try {
            // Note: Supabase typically uses HS256. If using a different algorithm (like RSA),
            // you'll need to fetch the public key and use Algorithm.RSA256(publicKey, null) etc.
            Algorithm algorithm = Algorithm.HMAC256(jwtSecret);
            
            JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(supabaseProjectUrl + "/auth/v1") // Verify issuer based on project URL
                .build(); 

            DecodedJWT decodedJWT = verifier.verify(token);

            // Optional: Add more checks like audience if needed
            // .withAudience("authenticated") 

            // Check expiration
            if (decodedJWT.getExpiresAt().before(new Date())) {
                log.error("Supabase token has expired");
                return null;
            }

            log.info("Supabase token verified successfully for subject: {}", decodedJWT.getSubject());
            return decodedJWT;

        } catch (Exception exception){
            log.error("Supabase token verification failed: {}", exception.getMessage());
            return null;
        }
    }

    public String getUserIdFromToken(String token) {
         DecodedJWT decodedJWT = verifyToken(token);
         return (decodedJWT != null) ? decodedJWT.getSubject() : null;
    }
}
