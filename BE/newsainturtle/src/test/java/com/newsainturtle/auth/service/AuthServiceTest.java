package com.newsainturtle.auth.service;

import com.newsainturtle.auth.dto.LoginRequest;
import com.newsainturtle.auth.dto.LoginResponse;
import com.newsainturtle.auth.exception.UnauthorizedUserException;
import com.newsainturtle.common.security.JwtTokenProvider;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static com.newsainturtle.auth.constant.AuthConstant.UNAUTHORIZED_USER_ERROR_MESSAGE;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
@DisplayName("인증 서비스 테스트")
class AuthServiceTest {

    @InjectMocks
    private AuthService authService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Nested
    @DisplayName("로그인")
    class Login {
        @Test
        @DisplayName("[실패] - 해당 이메일을 가진 사용자가 없음 ")
        void unauthorizedUser_notExistUser() throws Exception {
            //given
            final LoginRequest loginRequest = LoginRequest.builder()
                    .email("yunaghgh@naver.com")
                    .password("pwd1234").build();

            //when
            UnauthorizedUserException result = assertThrows(UnauthorizedUserException.class,
                    () -> authService.login(loginRequest));
            //then
            assertEquals(UNAUTHORIZED_USER_ERROR_MESSAGE, result.getMessage());
        }

        @Test
        @DisplayName("[실패] - 해당 이메일을 가진 사용자가 있지만, 비밀번호가 틀림 ")
        void unauthorizedUser_failPassword() throws Exception {
            //given
            PasswordEncoder encoder = new BCryptPasswordEncoder();
            final LoginRequest loginRequest = LoginRequest.builder()
                    .email("yunaghgh@naver.com")
                    .password("pwd1212").build();
            final User user = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password(encoder.encode("pwd1234"))
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            doReturn(user).when(userRepository).findByEmail(loginRequest.getEmail());
            doReturn(false).when(passwordEncoder).matches(anyString(), anyString());
            //when
            UnauthorizedUserException result = assertThrows(UnauthorizedUserException.class,
                    () -> authService.login(loginRequest));
            //then
            assertAll(
                    () -> assertEquals(UNAUTHORIZED_USER_ERROR_MESSAGE, result.getMessage()),
                    () -> assertFalse(encoder.matches(loginRequest.getPassword(), user.getPassword()))
            );
        }

        @Test
        @DisplayName("[성공] - 로그인 요청값과 일치하는 사용자가 있음 ")
        void successLogin() {
            //given
            PasswordEncoder encoder = new BCryptPasswordEncoder();
            JwtTokenProvider provider = new JwtTokenProvider();
            final LoginRequest loginRequest = LoginRequest.builder()
                    .email("yunaghgh@naver.com")
                    .password("pwd1234").build();
            final User user = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password(encoder.encode("pwd1234"))
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final String token = provider.createAccessToken(user.getEmail());

            doReturn(user).when(userRepository).findByEmail(loginRequest.getEmail());
            doReturn(true).when(passwordEncoder).matches(anyString(), anyString());
            doReturn(token).when(jwtTokenProvider).createAccessToken(user.getEmail());

            //when
            LoginResponse result = authService.login(loginRequest);

            //then
            assertAll(
                    () -> assertEquals(result.getNickname(), user.getNickname()),
                    () -> assertTrue(encoder.matches(loginRequest.getPassword(), user.getPassword())),
                    () -> assertTrue(encoder.matches(loginRequest.getPassword(), user.getPassword()))
            );
        }
    }
}