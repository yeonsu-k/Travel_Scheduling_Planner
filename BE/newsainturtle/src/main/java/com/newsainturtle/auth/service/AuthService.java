package com.newsainturtle.auth.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.newsainturtle.auth.dto.*;
import com.newsainturtle.auth.dto.kakao.KakaoInfoMapResponse;
import com.newsainturtle.auth.dto.kakao.KakaoInfoResponse;
import com.newsainturtle.auth.dto.KakaoCodeUrlResponse;
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
    public KakaoCodeUrlResponse getKakaoAuthUrl() {
        StringBuilder sb = new StringBuilder();
        sb.append(KAKAO_AUTH_URL)
                .append("/oauth/authorize?")
                .append("client_id=")
                .append(kakaoClientID)
                .append("&")
                .append("redirect_uri=")
                .append(redirectURL)
                .append("&response_type=code");
        KakaoCodeUrlResponse kakaoCodeURLResponse = KakaoCodeUrlResponse.builder()
                .url(sb.toString())
                .build();
        return kakaoCodeURLResponse;
    }

    public LoginResponse loginKakao(String code) {
        String accessToken = getKakaoToken(code);
        return getKakaoInfo(accessToken);
    }

    private String getKakaoToken(String code){
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "authorization_code");
        formData.add("client_id", kakaoClientID);
        formData.add("redirect_uri", redirectURL);
        formData.add("client_secret", kakaoClientSecretCode);
        formData.add("code", code);

        KakaoTokenResponse kakaoTokenResponse =
                WebClient.create(KAKAO_AUTH_URL).post()
                        .uri("/oauth/token")
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .body(BodyInserters.fromFormData(formData))
                        .retrieve()
                        .onStatus(status -> status.is4xxClientError()
                                        || status.is5xxServerError()
                                , clientResponse ->
                                        clientResponse.bodyToMono(String.class)
                                                .map(body -> new RuntimeException(body)))
                        .bodyToMono(KakaoTokenResponse.class)
                        .block();
        return kakaoTokenResponse.getAccessToken();
    }

    private KakaoInfoResponse connectKakaoUser(String accessToken){
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("property_keys", "[\"kakao_account.profile\",\"kakao_account.email\"]");

        KakaoInfoMapResponse kakaoInfoMapResponse =
                WebClient.create(KAKAO_API_URL).post()
                        .uri("/v2/user/me")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .body(BodyInserters.fromFormData(formData))
                        .retrieve()
                        .onStatus(status -> status.is4xxClientError()
                                        || status.is5xxServerError()
                                , clientResponse ->
                                        clientResponse.bodyToMono(String.class)
                                                .map(body -> new RuntimeException(body)))
                        .bodyToMono(KakaoInfoMapResponse.class)
                        .block();

        return kakaoInfoMapResponse.getKakaoAccount();
    }

    private void disconnectKakaoUser(String accessToken){
        WebClient.create(KAKAO_API_URL).post()
                .uri("/v1/user/unlink")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .retrieve()
                .onStatus(status -> status.is4xxClientError()
                                || status.is5xxServerError()
                        , clientResponse ->
                                clientResponse.bodyToMono(String.class)
                                        .map(body -> new RuntimeException(body)))
                .bodyToMono(String.class).block();
    }

    private LoginResponse getKakaoInfo(String accessToken) {

        KakaoInfoResponse kakaoInfoResponse = connectKakaoUser(accessToken);

        if (kakaoInfoResponse != null && kakaoInfoResponse.isHasEmail() && !kakaoInfoResponse.isEmailNeedsAgreement() && !kakaoInfoResponse.isProfileNicknameNeedsAgreement()) {
            if (kakaoInfoResponse.isEmailValid() && kakaoInfoResponse.getEmail() != null) {
                User user = userRepository.findByEmail(kakaoInfoResponse.getEmail());
                if (user == null) {
                    if (kakaoInfoResponse.getProfile() != null && kakaoInfoResponse.getProfile().getNickname() != null) {
                        final User newUser = User.builder()
                                .email(kakaoInfoResponse.getEmail())
                                .nickname(kakaoInfoResponse.getProfile().getNickname())
                                .profile("")
                                .withdraw(false)
                                .kakao(true)
                                .build();
                        userRepository.save(newUser);
                        return LoginResponse.builder().accessToken(jwtTokenProvider.createAccessToken(newUser.getEmail())).nickname(newUser.getNickname()).profile(newUser.getProfile()).build();
                    }
                } else if (!user.isKakao() || user.isWithdraw()) {
                    disconnectKakaoUser(accessToken);
                    throw new UnavailableEmailException();
                } else {
                    return LoginResponse.builder().accessToken(jwtTokenProvider.createAccessToken(user.getEmail())).nickname(user.getNickname()).profile(user.getProfile()).build();
                }
            }
        }

        disconnectKakaoUser(accessToken);
        throw new KakaoLoginException();
    }

}