package com.newsainturtle.user.service;

import com.newsainturtle.auth.dto.EmailDuplicateCheckRequest;
import com.newsainturtle.auth.dto.EmailDuplicateCheckResponse;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;


@ExtendWith(MockitoExtension.class)
@DisplayName("유저 서비스 테스트")
class UserServiceTest {

    @InjectMocks
    private UserService userService;
    @Mock
    private UserRepository userRepository;

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
            assertTrue(response.getIsDuplicate());
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
            assertFalse(response.getIsDuplicate());
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
}