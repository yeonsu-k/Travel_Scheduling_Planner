package com.newsainturtle.friend.service;

import com.newsainturtle.friend.dto.UserSearchRequest;
import com.newsainturtle.friend.dto.UserSearchResponse;
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
@DisplayName("친구 서비스 테스트")
class FriendServiceTest {

    @InjectMocks
    private FriendService friendService;
    @Mock
    private UserRepository userRepository;

    @Nested
    @DisplayName("사용자 검색 테스트")
    class UserSearchTest {
        @Test
        @DisplayName("[성공] - 사용자 없음")
        void notExistUser() {
            //given
            final UserSearchRequest userSearchRequest = UserSearchRequest.builder()
                    .email("yunaghgh@naver.com")
                    .build();
            doReturn(null).when(userRepository).findByEmail(userSearchRequest.getEmail());
            //when
            final UserSearchResponse result = friendService.searchUser(userSearchRequest);
            //then
            assertFalse(result.isExist());
        }

        @Test
        @DisplayName("[성공] - 사용자 있음")
        void existUser() {
            //given
            final UserSearchRequest userSearchRequest = UserSearchRequest.builder()
                    .email("yunaghgh@naver.com")
                    .build();
            final User user = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();

            doReturn(user).when(userRepository).findByEmail(userSearchRequest.getEmail());
            //when
            final UserSearchResponse result = friendService.searchUser(userSearchRequest);
            //then
            assertTrue(result.isExist());
        }
    }
}