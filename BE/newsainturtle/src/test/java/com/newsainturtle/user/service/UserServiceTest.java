package com.newsainturtle.user.service;

import com.newsainturtle.auth.constant.AuthConstant;
import com.newsainturtle.auth.dto.EmailDuplicateCheckRequest;
import com.newsainturtle.auth.dto.EmailDuplicateCheckResponse;
import com.newsainturtle.auth.dto.UserJoinRequest;
import com.newsainturtle.auth.dto.UserJoinResponse;
import com.newsainturtle.auth.exception.NoEmailCheckException;
import com.newsainturtle.user.dto.UserBasicInfoRequest;
import com.newsainturtle.user.dto.UserBasicInfoResponse;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;


@ExtendWith(MockitoExtension.class)
@Transactional
@DisplayName("유저 서비스 테스트")
class UserServiceTest {

    @InjectMocks
    private UserService userService;
    @Mock
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Nested
    @DisplayName("[이메일 중복 검사]")
    class EmailDuplicateCheck{
        @Test
        @DisplayName("[성공] - 이미 존재하는 이메일 ")
        void alreadyExistEmail(){
            //given
            final EmailDuplicateCheckRequest emailDuplicateCheckRequest = EmailDuplicateCheckRequest.builder()
                    .email("tjdtn123@naver.com").build();
            final User user = User.builder()
                    .email("tjdtn123@naver.com")
                    .kakao(false)
                    .nickname("성게")
                    .profile("path/src")
                    .password("1q2w3e4r!")
                    .build();
            doReturn(user).when(userRepository).findByEmail(emailDuplicateCheckRequest.getEmail());
            //when
            EmailDuplicateCheckResponse response = userService.emailDuplicateCheck(emailDuplicateCheckRequest);
            //then
            assertTrue(response.isDuplicateCheck());
        }
        @Test
        @DisplayName("[성공] - 존재하지 않는 이메일")
        void notExistEmail(){
            //given
            final EmailDuplicateCheckRequest emailDuplicateCheckRequest = EmailDuplicateCheckRequest.builder()
                    .email("tjdtn123@naver.com").build();
            doReturn(null).when(userRepository).findByEmail(emailDuplicateCheckRequest.getEmail());
            //when
            EmailDuplicateCheckResponse response = userService.emailDuplicateCheck(emailDuplicateCheckRequest);
            //then
            assertFalse(response.isDuplicateCheck());
        }
    }

    @Nested
    @DisplayName("JWT를 위한 사용자 이메일 체크")
    class EmailCheck {
        @Test
        @DisplayName("[성공] - 사용자가 있음 ")
        void existUser() {
            //given
            final UserBasicInfoRequest userBasicInfoRequest = UserBasicInfoRequest.builder()
                    .email("yunaghgh@naver.com").build();
            final User user = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            doReturn(user).when(userRepository).findByEmail(userBasicInfoRequest.getEmail());
            //when
            UserBasicInfoResponse result = userService.emailCheck(userBasicInfoRequest);
            //then
            assertEquals(result.getEmail(), user.getEmail());
        }

        @Test
        @DisplayName("[성공] - 사용자가 없음 ")
        void notExistUser() {
            //given
            final UserBasicInfoRequest userBasicInfoRequest = UserBasicInfoRequest.builder()
                    .email("yunaghgh@naver.com").build();
            //when
            UserBasicInfoResponse result = userService.emailCheck(userBasicInfoRequest);
            //then
            assertNull(result);
        }
    }

    @Nested
    @DisplayName("회원가입")
    class joinMember{
        final String encodedPassword = new BCryptPasswordEncoder().encode("1234");

        @Test
        @DisplayName("[성공] - 회원가입 성공")
        void joinUser() {
            //given
            final UserJoinRequest userJoinRequest = UserJoinRequest.builder()
                    .email("test1234@email.com")
                    .nickname("별명")
                    .duplicatedCheck(true)
                    .password("1234")
                    .build();
            doReturn(user()).when(userRepository).save(any(User.class));
            //when
            UserJoinResponse result = userService.joinUser(userJoinRequest);
            //then
            assertThat(result.getEmail()).isEqualTo(userJoinRequest.getEmail());
            assertThat(result.getNickname()).isEqualTo(userJoinRequest.getNickname());
        }
        @Test
        @DisplayName("[실패] - 이메일 중복 검사가 완료되지 않음")
        void noEmailCheck(){
            //given
            final UserJoinRequest userJoinRequest = UserJoinRequest.builder()
                    .email("test1234@email.com")
                    .nickname("별명")
                    .duplicatedCheck(false)
                    .password("1234")
                    .build();
            //when
            final NoEmailCheckException result = assertThrows(NoEmailCheckException.class,
                    () -> userService.joinUser(userJoinRequest));
            //then
            assertThat(result.getMessage()).isEqualTo(AuthConstant.NO_EMAIL_CHECK_ERROR_MESSAGE);
        }


        private User user(){
            return User.builder()
                    .email("test1234@email.com")
                    .nickname("별명")
                    .password(encodedPassword)
                    .profile("")
                    .withdraw(false)
                    .kakao(false)
                    .build();
        }
    }


}