package com.newsainturtle.auth.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.newsainturtle.auth.dto.*;
import com.newsainturtle.auth.dto.kakao.KakaoInfoMapResponse;
import com.newsainturtle.auth.dto.kakao.KakaoInfoResponse;
import com.newsainturtle.auth.dto.KakaoLoginCodeUrlResponse;
import com.newsainturtle.auth.dto.kakao.KakaoTokenResponse;
import com.newsainturtle.auth.exception.InvalidTokenException;
import com.newsainturtle.auth.exception.KakaoLoginException;
import com.newsainturtle.auth.exception.UnauthorizedUserException;
import com.newsainturtle.auth.exception.UnavailableEmailException;
import com.newsainturtle.common.security.JwtTokenProvider;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static com.newsainturtle.auth.constant.AuthConstant.KAKAO_API_URL;
import static com.newsainturtle.auth.constant.AuthConstant.KAKAO_AUTH_URL;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${kakao.key.cliend-id}")
    private String kakaoClientID;

    @Value("${kakao.key.cliend-secret-code}")
    private String kakaoClientSecretCode;

    @Value("${kakao.key.redirect-url}")
    private String redirectURL;

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

    @Transactional(readOnly = true)
    public KakaoLoginCodeUrlResponse getKakaoAuthUrl() {
        StringBuilder sb = new StringBuilder();
        sb.append(KAKAO_AUTH_URL)
                .append("/oauth/authorize?")
                .append("client_id=")
                .append(kakaoClientID)
                .append("&")
                .append("redirect_uri=")
                .append(redirectURL)
                .append("&response_type=code");
        KakaoLoginCodeUrlResponse kakaoLoginCodeURLResponse = KakaoLoginCodeUrlResponse.builder()
                .url(sb.toString())
                .build();
        return kakaoLoginCodeURLResponse;
    }


}