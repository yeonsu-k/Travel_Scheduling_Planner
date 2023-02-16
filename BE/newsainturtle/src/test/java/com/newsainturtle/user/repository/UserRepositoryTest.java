package com.newsainturtle.user.repository;

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
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Nested
    @DisplayName("이메일 중복 검사")
    class EmailDuplicateCheck{
        @Test
        @DisplayName("[성공] - 이미 존재하는 이메일")
        void alreadyExistEmail(){
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
        void notExistEmail(){
            //given
            final String trialEmail = "tjdtn123@naver.com";
            //when
            Optional<User> result = Optional.ofNullable(userRepository.findByEmail(trialEmail));
            //then
            assertFalse(result.isPresent());
        }
    }
}