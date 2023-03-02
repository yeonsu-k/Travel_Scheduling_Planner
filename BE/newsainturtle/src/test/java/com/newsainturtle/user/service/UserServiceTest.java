package com.newsainturtle.user.service;

import com.newsainturtle.auth.constant.AuthConstant;
import com.newsainturtle.auth.dto.EmailDuplicateCheckRequest;
import com.newsainturtle.auth.dto.EmailDuplicateCheckResponse;
import com.newsainturtle.auth.dto.UserJoinRequest;
import com.newsainturtle.auth.dto.UserJoinResponse;
import com.newsainturtle.auth.exception.NoEmailCheckException;
import com.newsainturtle.user.constant.UserConstant;
import com.newsainturtle.user.dto.*;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.exception.NotEqualsPasswordException;
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

    @Nested
    @DisplayName("마이페이지 조회")
    class getMyPageInfo{
        @Test
        @DisplayName("[성공] - 마이페이지 조회(유저 기본 정보)")
        void getUserInfo(){
            String email = "test123@naver.com";
            //given
            final User user = User.builder()
                    .email(email)
                    .nickname("별명")
                    .profile("")
                    .build();
            doReturn(user).when(userRepository).findByEmail(email);
            //when
            UserInfoResponse result = userService.getUserInfo(email);
            //then
            assertEquals(result.getEmail(), user.getEmail());
            assertEquals(result.getNickname(), user.getNickname());
            assertEquals(result.getProfile(), user.getProfile());
        }
    }

    @Nested
    @DisplayName("유저 정보 수정")
    class ModifyMypage{
        @Test
        @DisplayName("[성공] - 프로필 사진 수정")
        void modifyProfile(){
            String email = "test123@naver.com";
            final String path = "default/path";
            final String newPath = "new/path";
            //given
            final User user = User.builder()
                    .email(email)
                    .nickname("별명")
                    .profile(path)
                    .build();
            doReturn(user).when(userRepository).findByEmail(email);
            user.setProfile(newPath);
            //when
            ProfileResponse result = userService. modifyProfile(email, newPath);
            //then
            assertEquals(result.getPath(), user.getProfile());
            assertEquals(result.getPath(), newPath);
        }

        @Test
        @DisplayName("[성공] - 회원 정보 수정")
        void modifyUserInfo(){
            PasswordEncoder encoder = new BCryptPasswordEncoder();
            String email = "test123@naver.com";
            final String nickname = "기본별명";
            final String password = "1q2w3r4w!";
            final String newNickName = "변경된 별명";
            final String newPassword = "2w3a4d";
            ModifyUserInfoRequest modifyUserInfoRequest = ModifyUserInfoRequest.builder()
                    .nickname(newNickName)
                    .newPassword(newPassword)
                    .build();
            //given
            final User user = User.builder()
                    .email(email)
                    .nickname(nickname)
                    .password(password)
                    .build();
            doReturn(user).when(userRepository).findByEmail(email);
            user.setPassword(password);
            user.setNickname(nickname);
            //when
            userService.modifyUserInfo(email, modifyUserInfoRequest);
            //then
            assertEquals(user.getNickname(),newNickName);
            assertTrue(encoder.matches(newPassword,user.getPassword()));
        }

        @Test
        @DisplayName("[실패] - 기존의 비밀번호와 일치하지 않음")
        void noEmailCheck(){
            String email = "test123@naver.com";
            final String nickname = "기본별명";
            final String password = "1q2w3r4w!";
            final String invalidPw = "eroor123";
            final String newNickName = "변경된 별명";
            final String newPassword = "2w3a4d";
            final User user = User.builder()
                    .email(email)
                    .password(password)
                    .nickname(nickname)
                    .profile("")
                    .build();
            //given
            ModifyUserInfoRequest modifyUserInfoRequest = ModifyUserInfoRequest.builder()
                    .password(invalidPw)
                    .nickname(newNickName)
                    .newPassword(newPassword)
                    .build();
            doReturn(user).when(userRepository).findByEmail(email);
            //when
            final NotEqualsPasswordException result = assertThrows(NotEqualsPasswordException.class,
                    () -> userService.modifyUserInfo(email, modifyUserInfoRequest));
            //then
            assertThat(result.getMessage()).isEqualTo(UserConstant.NOT_EQUALS_PASSWORD_MESSAGE);
        }

    }

}