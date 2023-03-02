package com.newsainturtle.user.repository;

import com.newsainturtle.auth.dto.UserJoinRequest;
import com.newsainturtle.user.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@DisplayName("유저 레포지토리 테스트")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Nested
    @DisplayName("이메일 중복 검사")
    class EmailDuplicateCheck {
        @Test
        @DisplayName("[성공] - 이미 존재하는 이메일")
        void alreadyExistEmail() {
            //given
            final String trialEmail = "tjdtn123@naver.com";
            final User user = User.builder()
                    .email("tjdtn123@naver.com")
                    .kakao(false)
                    .nickname("성게")
                    .profile("path/src")
                    .password("1q2w3e4r!")
                    .build();
            userRepository.save(user);
            //when
            Optional<User> result = Optional.ofNullable(userRepository.findByEmail(trialEmail));
            //then
            assertNotNull(result);
        }

        @Test
        @DisplayName("[성공] - 가입 가능한 이메일")
        void notExistEmail() {
            //given
            final String trialEmail = "tjdtn123@naver.com";
            //when
            Optional<User> result = Optional.ofNullable(userRepository.findByEmail(trialEmail));
            //then
            assertFalse(result.isPresent());
        }

    }

    @Nested
    @DisplayName("회원가입")
    class Join {
        @Test
        @DisplayName("[성공] - 회원가입 성공")
        void joinUser() {
            //given
            final User user = User.builder()
                    .email("test1234@email.com")
                    .profile("")
                    .kakao(false)
                    .nickname("별명")
                    .withdraw(false)
                    .password("1234")
                    .build();
            //when
            final User result = userRepository.save(user);
            //then
            assertNotNull(result);
            assertEquals(result.getUserId(), user.getUserId());
            assertEquals(result.getEmail(), user.getEmail());
        }
    }

    @Nested
    @DisplayName("마이페이지 조회")
    class GetMyPageInfo {
        @Test
        @DisplayName("[성공] - 마이페이지 조회(유저 기본 정보)")
        void getUserInfo() {
            final String email = "test@1234.com";
            //given
            final User user = User.builder()
                    .email(email)
                    .nickname("별명")
                    .profile("").build();
            userRepository.save(user);
            //when
            User result = userRepository.findByEmail(email);
            //then
            assertEquals(result.getEmail(), user.getEmail());
            assertEquals(result.getNickname(), user.getNickname());
            assertEquals(result.getProfile(), user.getProfile());
        }
    }

    @Nested
    @DisplayName("유저 정보 수정")
    class ModifyUserInfo {
        @Test
        @DisplayName("[성공] - 프로필 사진 수정")
        void modifyProfile() {
            final String email = "test@1234.com";
            final String path = "default/path";
            final String newPath = "new/path";
            //given
            final User user = User.builder()
                    .email(email)
                    .nickname("별명")
                    .profile(path).build();
            userRepository.save(user);
            //when
            User result = userRepository.findByEmail(email);
            result.setProfile(newPath);
            userRepository.save(result);
            //then
            assertEquals(result.getUserId(), user.getUserId());
            assertEquals(result.getEmail(), user.getEmail());
            assertEquals(result.getProfile(), newPath);
        }
    }
}