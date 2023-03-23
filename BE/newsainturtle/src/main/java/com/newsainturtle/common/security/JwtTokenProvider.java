package com.newsainturtle.common.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private static String secretKey = "asdf1sdf3snct127d2sdf2d";

    @Value("${spring.jwt.secretKey}")
    private void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    private static final long ACCESS_TOKEN_VALID_TIME = 30 * 600 * 1000L;
    private static final long REFRESH_TOKEN_VALID_TIME = 30 * 24 * 60 * 60 * 1000L;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .build();
    }

    public String createAccessToken(String email) {
        return getToken(email, ACCESS_TOKEN_VALID_TIME);
    }

    private static String getToken(String email, long tokenInvalidTime) {
        Date expires = JwtTokenProvider.getTokenExpiration(tokenInvalidTime);
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(expires)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public static Date getTokenExpiration(long expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    public static DecodedJWT handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .build();
        try {
            return verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}
