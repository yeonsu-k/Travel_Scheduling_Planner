package com.newsainturtle.auth.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.newsainturtle.auth.dto.LoginRequest;
import com.newsainturtle.auth.dto.LoginResponse;
import com.newsainturtle.auth.dto.TokenCheckRequest;
import com.newsainturtle.auth.dto.TokenCheckResponse;
import com.newsainturtle.auth.exception.InvalidTokenException;
import com.newsainturtle.auth.exception.UnauthorizedUserException;
import com.newsainturtle.common.security.JwtTokenProvider;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new UnauthorizedUserException();
        }
        return LoginResponse.builder().accessToken(jwtTokenProvider.createAccessToken(user.getEmail())).nickname(user.getNickname()).profile(user.getProfile()).build();
    }

    @Transactional(readOnly = true)
    public TokenCheckResponse checkAccessToken(TokenCheckRequest tokenCheckRequest) {

        String token = tokenCheckRequest.getAccessToken();
        if (token != null) {
            DecodedJWT decodedJWT = JwtTokenProvider.handleError(token);
            String userEmail = decodedJWT.getSubject();
            User user = userRepository.findByEmail(userEmail);
            if (user != null) {
                return TokenCheckResponse.builder().nickname(user.getNickname()).profile(user.getProfile()).build();
            }
        }
        throw new InvalidTokenException();
    }
}